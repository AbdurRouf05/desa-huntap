import PocketBase from "pocketbase";

const pb = new PocketBase(
  process.env.NEXT_PUBLIC_POCKETBASE_URL || "https://db-huntap.sagamuda.id"
);

// Disable auto-cancellation so multiple requests can run simultaneously
pb.autoCancellation(false);

/**
 * Construct the full URL for a file stored in PocketBase/MinIO.
 * Usage: getFileUrl(record, record.thumbnail)
 */
export function getFileUrl(
  collectionIdOrName: string,
  recordId: string,
  filename: string,
  thumb?: string
): string {
  if (!filename) return "";
  const base = `${pb.baseURL}/api/files/${collectionIdOrName}/${recordId}/${filename}`;
  return thumb ? `${base}?thumb=${thumb}` : base;
}

export default pb;
