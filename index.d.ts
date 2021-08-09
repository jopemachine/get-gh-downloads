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
  onlyLatest,
}: {
  userId: string;
  repository: string;
  tagName?: string;
  name?: string;
  onlyLatest?: boolean;
}): Promise<DownloadInfo[]>;
