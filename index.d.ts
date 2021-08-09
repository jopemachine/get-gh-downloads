interface AssetDownloadInfo {
  name: string;
  downloadCount: number;
}

interface DownloadInfo {
  name: string;
  tagName: string;
  assets: AssetDownloadInfo[];
}

export default function ({
  userId,
  repository,
  tagName,
  name,
}: {
  userId: string;
  repository: string;
  tagName?: string;
  name?: string;
}): Promise<DownloadInfo[]>;
