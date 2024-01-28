export interface Video {
  id?: number;
  youtubeId: string;
  title: string;
  thumbnailUrl: string;
  duration: string;
  description: string;
  channelTitle: string;
}

export interface SearchResultListVO {
  nextPageToken: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
  videos: Video[];
}
