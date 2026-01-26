import { environment } from '../Environment/environment';

const SECRET = environment.idSecret;

function base64UrlEncode(str: string): string {
  return btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

function base64UrlDecode(str: string): string {
  const padded = str.replace(/-/g, '+').replace(/_/g, '/') + '==='.slice((str.length + 3) % 4);
  return atob(padded);
}

export function encodeId(id: number): string {
  if (!Number.isInteger(id) || id < 0) throw new Error('Invalid id');
  const mixed = (id ^ SECRET) >>> 0;
  return base64UrlEncode(mixed.toString(36));
}

export function decodeId(encoded: string): number {
  const raw = base64UrlDecode(encoded);
  const mixed = parseInt(raw, 36);
  if (!Number.isFinite(mixed)) throw new Error('Invalid encoded id');
  const id = (mixed ^ SECRET) >>> 0;
  return id;
}
