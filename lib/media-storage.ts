export type MediaObject = { key: string; url: string; contentType: string; size: number };

export interface MediaStorage {
  publicUrl(key: string): string;
  delete(key: string): Promise<void>;
}

export class S3CompatibleStorage implements MediaStorage {
  constructor(private config: { endpoint: string; bucket: string; publicBaseUrl?: string }) {}
  publicUrl(key: string) { return this.config.publicBaseUrl ? `${this.config.publicBaseUrl}/${key}` : `${this.config.endpoint}/${this.config.bucket}/${key}`; }
  async delete(_key: string) { throw new Error("S3 delete adapter requires provider credentials and an S3 client in the deployment environment."); }
}

export function getMediaStorage() {
  const endpoint = process.env.S3_ENDPOINT;
  if (!endpoint) return null;
  return new S3CompatibleStorage({ endpoint, bucket: process.env.S3_BUCKET ?? "lago-media", publicBaseUrl: process.env.S3_PUBLIC_BASE_URL });
}
