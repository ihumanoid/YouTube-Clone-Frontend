export interface Video {
  id?: number;
  youtubeId: string;
  title: string;
  thumbnailUrl: string;
  duration: string;
  description: string;
  channelTitle: string;
}

export interface WatchListVO {
  id: number;
  title: string;
  length: number;
  commercial: Video;
  showAfterVideoIdx: number;
  videos: Video[];
}

export interface WatchListDTO {
  title: string;
  length: number;
  commercial: Video;
  showAfterVideoIdx: number;
  videos: Video[];
}

export interface SearchResultListVO {
  nextPageToken: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
  videos: Video[];
}

export interface SystemSummaryVO {
  count: number;
  item: string;
}

export interface ExperimentDataVO {
  id: string;
  participantId: string;
  watchListId: number;
  skipEnabled: boolean;
  showAfterVideoIdx: number;
  currentVideoIdx: number;
  watchListVO: WatchListVO;
}

export interface VideoDataDTO {
  experimentId: string;
  participantId: string;
  watchListId: number;
  videoId: number;
  watchTime: number;
  numSkipsAhead: number;
  numSkipsBehind: number;
  liked: boolean;
  disliked: boolean;
}

export interface AdvertisementDataDTO {
  participantId: string;
  watchListId: number;
  skipEnabled: boolean;
  skipped: boolean;
}

export interface SurveyDataDTO {
  experimentId: string;
  advertisementRating: number;
  advertisementBrand: string;
  advertisementProduct: string;
}

export interface VideoTopic {
  id: string;
  topic: string;
}
