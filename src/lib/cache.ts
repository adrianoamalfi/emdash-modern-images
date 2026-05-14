import fs from "fs";
import path from "path";
import crypto from "crypto";

export const CACHE_DIR = process.env.IMAGE_CACHE_DIR || "./uploads/.cache/images";

export interface CacheKey {
  storageKey: string;
  width: number;
  format: string;
  quality: number;
  mtimeMs: number;
}

function cachePath(key: CacheKey): string {
  const hash = crypto
    .createHash("sha256")
    .update(`${key.storageKey}:${key.width}:${key.format}:${key.quality}:${key.mtimeMs}`)
    .digest("hex");
  return path.resolve(CACHE_DIR, `${hash}.${key.format}`);
}

export function computeETag(data: {
  storageKey: string;
  width: number;
  format: string;
  quality: number;
  mtimeMs: number;
  size: number;
}): string {
  return crypto
    .createHash("sha256")
    .update(`${data.storageKey}:${data.width}:${data.format}:${data.quality}:${data.mtimeMs}:${data.size}`)
    .digest("hex");
}

export async function saveToCache(result: {
  buffer: Buffer;
  storageKey: string;
  width: number;
  format: string;
  quality: number;
  mtimeMs: number;
}): Promise<void> {
  const dest = cachePath(result);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, result.buffer);
}

export interface CachedResult {
  exists: boolean;
  buffer: Buffer;
  mime: string;
}

const MIME_MAP: Record<string, string> = {
  webp: "image/webp",
  avif: "image/avif",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
};

export function readFromCache(opts: CacheKey): CachedResult | null {
  const filePath = cachePath(opts);
  try {
    const buffer = fs.readFileSync(filePath);
    return { exists: true, buffer, mime: MIME_MAP[opts.format] || "image/webp" };
  } catch {
    return null;
  }
}
