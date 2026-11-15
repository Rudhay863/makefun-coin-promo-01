// main.ts — makefun-coin-promo-01 entry program (Node 22, stdlib only).
//
// The coin itself is the entry; this program is never judged. All it does is
// copy LAUNCH.json from the repository root into the output directory, after
// validating that the mint and the create signature look like real Solana
// values. It prints NOTHING on success and exits 0. On any failure it prints
// one line to stderr and exits 1.

import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const BASE58_ALPHABET = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';

function fail(message: string): never {
  console.error(`main.ts: ${message}`);
  process.exit(1);
}

function isBase58(value: string): boolean {
  if (value.length === 0) return false;
  for (const ch of value) {
    if (!BASE58_ALPHABET.includes(ch)) return false;
  }
  return true;
}

// Decode a base58 string to raw bytes (BigInt-based, no dependencies).
// Leading '1's are leading zero bytes.
function base58Decode(value: string): Buffer {
  let n = 0n;
  for (const ch of value) {
    n = n * 58n + BigInt(BASE58_ALPHABET.indexOf(ch));
  }
  const bytes: number[] = [];
  while (n > 0n) {
    bytes.unshift(Number(n & 0xffn));
    n >>= 8n;
  }
  let leadingZeros = 0;
  for (const ch of value) {
    if (ch !== '1') break;
    leadingZeros++;
  }
  return Buffer.concat([Buffer.alloc(leadingZeros), Buffer.from(bytes)]);
}

const botDir = process.env.MAKEFUN_BOT_DIR ?? '.';
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? 'out';

let raw: string;
try {
  raw = readFileSync(join(botDir, 'LAUNCH.json'), 'utf8');
} catch {
  fail('cannot read LAUNCH.json');
}

let launch: unknown;
try {
  launch = JSON.parse(raw!);
} catch {
  fail('LAUNCH.json is not valid JSON');
}

if (typeof launch !== 'object' || launch === null || Array.isArray(launch)) {
  fail('LAUNCH.json must be a JSON object');
}
const { mint, create_signature: createSignature } = launch as Record<string, unknown>;

if (typeof mint !== 'string' || mint.length < 32 || mint.length > 44 || !isBase58(mint)) {
  fail('mint must be a base58 string of 32-44 characters');
}
if (typeof createSignature !== 'string' || !isBase58(createSignature)) {
  fail('create_signature must be a base58 string');
}
if (base58Decode(createSignature).length !== 64) {
  fail('create_signature must decode to exactly 64 bytes');
}

try {
  mkdirSync(outDir, { recursive: true });
  copyFileSync(join(botDir, 'LAUNCH.json'), join(outDir, 'LAUNCH.json'));
} catch {
  fail('cannot copy LAUNCH.json to the output directory');
}
