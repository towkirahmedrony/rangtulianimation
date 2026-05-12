export type Episode = {
  id: string;
  videoId: string;
  title: string;
  slug: string;

  description: string;
  seoDescription?: string;
  seoTitle?: string;

  thumbnail: string;
  publishedAt?: string;
  createdAt?: number | string;

  viewCount?: number | string;
  duration?: string;

  youtubeUrl: string;
  embedUrl: string;

  tags?: string[];
  originalDescription?: string;
};

export interface YouTubeApiResponse {
  items: {
    id?: {
      videoId: string;
    };
    snippet: {
      title: string;
      description: string;
      publishedAt: string;
      thumbnails: {
        high?: { url: string };
        medium?: { url: string };
        default?: { url: string };
      };
      resourceId?: {
        videoId: string;
      };
    };
  }[];
}
