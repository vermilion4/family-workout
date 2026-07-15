// Zero-dependency PWA icon generator.
//
// Draws a bold coral dumbbell glyph on a charcoal background and encodes it
// as a valid PNG using only Node's built-in `zlib` module (no image/canvas
// libraries). Produces the three icons referenced by the PWA manifest:
//   public/icons/icon-192.png      192x192
//   public/icons/icon-512.png      512x512
//   public/icons/maskable-512.png  512x512 (glyph kept inside the ~80% safe zone)
//
// Run with: node scripts/gen-icons.mjs

import { deflateSync, crc32 } from 'node:zlib';
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = join(__dirname, '..', 'public', 'icons');

// --- theme colors -----------------------------------------------------
const BG = [0x14, 0x16, 0x1b]; // #14161b charcoal
const CORAL = [0xff, 0x5a, 0x36]; // #ff5a36

// --- tiny raster canvas ------------------------------------------------
function makeCanvas(size, bg) {
  const buf = new Uint8Array(size * size * 4);
  for (let i = 0; i < size * size; i++) {
    buf[i * 4] = bg[0];
    buf[i * 4 + 1] = bg[1];
    buf[i * 4 + 2] = bg[2];
    buf[i * 4 + 3] = 255;
  }
  return buf;
}

function fillRect(buf, size, x0, y0, x1, y1, color) {
  const xs = Math.max(0, Math.round(x0));
  const ys = Math.max(0, Math.round(y0));
  const xe = Math.min(size, Math.round(x1));
  const ye = Math.min(size, Math.round(y1));
  for (let y = ys; y < ye; y++) {
    for (let x = xs; x < xe; x++) {
      const i = (y * size + x) * 4;
      buf[i] = color[0];
      buf[i + 1] = color[1];
      buf[i + 2] = color[2];
      buf[i + 3] = 255;
    }
  }
}

// Filled circle via distance test (used for slightly softened plate corners).
function fillCircle(buf, size, cx, cy, r, color) {
  const xs = Math.max(0, Math.floor(cx - r));
  const xe = Math.min(size, Math.ceil(cx + r));
  const ys = Math.max(0, Math.floor(cy - r));
  const ye = Math.min(size, Math.ceil(cy + r));
  for (let y = ys; y < ye; y++) {
    for (let x = xs; x < xe; x++) {
      const dx = x - cx + 0.5;
      const dy = y - cy + 0.5;
      if (dx * dx + dy * dy <= r * r) {
        const i = (y * size + x) * 4;
        buf[i] = color[0];
        buf[i + 1] = color[1];
        buf[i + 2] = color[2];
        buf[i + 3] = 255;
      }
    }
  }
}

// Draw a rounded rect approximated by a rect + 4 corner circles.
function fillRoundedRect(buf, size, x0, y0, x1, y1, r, color) {
  fillRect(buf, size, x0 + r, y0, x1 - r, y1, color);
  fillRect(buf, size, x0, y0 + r, x1, y1 - r, color);
  fillCircle(buf, size, x0 + r, y0 + r, r, color);
  fillCircle(buf, size, x1 - r, y0 + r, r, color);
  fillCircle(buf, size, x0 + r, y1 - r, r, color);
  fillCircle(buf, size, x1 - r, y1 - r, r, color);
}

// Draws a bold dumbbell glyph: two end "weight plate" blocks connected by a
// horizontal bar, centered in the canvas. `glyphFraction` controls how much
// of the canvas width the glyph spans (used to keep maskable icons inside
// their safe zone).
function drawDumbbell(buf, size, glyphFraction) {
  const cx = size / 2;
  const cy = size / 2;
  const g = size * glyphFraction; // overall glyph width
  const plateWidth = g * 0.22;
  const plateHeight = g * 0.58;
  const barHeight = g * 0.16;
  const cornerRadius = plateWidth * 0.28;

  const leftX0 = cx - g / 2;
  const leftX1 = leftX0 + plateWidth;
  const rightX1 = cx + g / 2;
  const rightX0 = rightX1 - plateWidth;
  const plateY0 = cy - plateHeight / 2;
  const plateY1 = cy + plateHeight / 2;

  // Connecting bar (handle).
  fillRect(buf, size, leftX1, cy - barHeight / 2, rightX0, cy + barHeight / 2, CORAL);

  // End plates.
  fillRoundedRect(buf, size, leftX0, plateY0, leftX1, plateY1, cornerRadius, CORAL);
  fillRoundedRect(buf, size, rightX0, plateY0, rightX1, plateY1, cornerRadius, CORAL);
}

// --- minimal PNG encoder (IHDR + IDAT + IEND, no external deps) --------
function crc32Of(buf) {
  // Node 20.12+ / 22.x expose zlib.crc32(); returns an unsigned 32-bit int.
  return crc32(buf) >>> 0;
}

function chunk(type, data) {
  const typeBuf = Buffer.from(type, 'ascii');
  const lenBuf = Buffer.alloc(4);
  lenBuf.writeUInt32BE(data.length, 0);
  const crcBuf = Buffer.alloc(4);
  crcBuf.writeUInt32BE(crc32Of(Buffer.concat([typeBuf, data])), 0);
  return Buffer.concat([lenBuf, typeBuf, data, crcBuf]);
}

function encodePNG(rgba, size) {
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(size, 0); // width
  ihdrData.writeUInt32BE(size, 4); // height
  ihdrData[8] = 8; // bit depth
  ihdrData[9] = 6; // color type: truecolor + alpha (RGBA)
  ihdrData[10] = 0; // compression method
  ihdrData[11] = 0; // filter method
  ihdrData[12] = 0; // interlace method
  const ihdr = chunk('IHDR', ihdrData);

  // Raw scanlines: each row prefixed with a filter-type byte (0 = None).
  const stride = size * 4;
  const raw = Buffer.alloc((stride + 1) * size);
  for (let y = 0; y < size; y++) {
    const rowStart = y * (stride + 1);
    raw[rowStart] = 0; // filter: None
    Buffer.from(rgba.buffer, rgba.byteOffset + y * stride, stride).copy(raw, rowStart + 1);
  }
  const idatData = deflateSync(raw, { level: 9 });
  const idat = chunk('IDAT', idatData);

  const iend = chunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdr, idat, iend]);
}

function generateIcon(size, glyphFraction) {
  const canvas = makeCanvas(size, BG);
  drawDumbbell(canvas, size, glyphFraction);
  return encodePNG(canvas, size);
}

// --- main ---------------------------------------------------------------
mkdirSync(OUT_DIR, { recursive: true });

const targets = [
  { file: 'icon-192.png', size: 192, glyphFraction: 0.72 },
  { file: 'icon-512.png', size: 512, glyphFraction: 0.72 },
  // Maskable: keep the glyph well inside the ~80% center safe zone.
  { file: 'maskable-512.png', size: 512, glyphFraction: 0.62 },
];

for (const { file, size, glyphFraction } of targets) {
  const png = generateIcon(size, glyphFraction);
  const outPath = join(OUT_DIR, file);
  writeFileSync(outPath, png);
  console.log(`wrote ${outPath} (${size}x${size}, ${png.length} bytes)`);
}
