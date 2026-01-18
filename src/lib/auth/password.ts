/**
 * Password hashing and verification using Web Crypto API (PBKDF2)
 * Compatible with Cloudflare Workers runtime
 */

const PBKDF2_ITERATIONS = 100000;
const SALT_LENGTH = 16;
const HASH_BITS = 256;

async function derivePBKDF2Bits(password: string, salt: Uint8Array): Promise<Uint8Array> {
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(password),
    { name: 'PBKDF2' },
    false,
    ['deriveBits']
  );

  const derivedBits = await crypto.subtle.deriveBits(
    { name: 'PBKDF2', salt, iterations: PBKDF2_ITERATIONS, hash: 'SHA-256' },
    keyMaterial,
    HASH_BITS
  );

  return new Uint8Array(derivedBits);
}

function toBase64(bytes: Uint8Array): string {
  return btoa(String.fromCharCode.apply(null, Array.from(bytes)));
}

function fromBase64(b64: string): Uint8Array {
  return Uint8Array.from(atob(b64), c => c.charCodeAt(0));
}

/**
 * Hash password with random salt. Returns "salt.hash" (base64 encoded).
 */
export async function hashPasswordPBKDF2(password: string): Promise<string> {
  const salt = crypto.getRandomValues(new Uint8Array(SALT_LENGTH));
  const hash = await derivePBKDF2Bits(password, salt);
  return `${toBase64(salt)}.${toBase64(hash)}`;
}

/**
 * Verify password against stored "salt.hash" format.
 */
export async function verifyPasswordPBKDF2(password: string, stored: string): Promise<boolean> {
  const [saltB64, hashB64] = stored.split('.');

  if (!saltB64 || !hashB64) {
    throw new Error('Invalid password hash format');
  }

  const salt = fromBase64(saltB64);
  const computedHash = await derivePBKDF2Bits(password, salt);

  return toBase64(computedHash) === hashB64;
}
