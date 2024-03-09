export interface Video {
  id?: number;
  youtubeId: string;
  title: string;
  thumbnailUrl: string;
  duration: string;
  description: string;
  channelTitle: string;
}

export interface Commercial {
  youtubeId: string;
  title: string;
  thumbnailUrl: string;
  duration: string;
  description: string;
  channelTitle: string;
}

export interface WatchListVideosVO {
  id: number;
  title: string;
  length: number;
  videos: Video[];
}

export interface WatchListCommercialsVO {
  id: number;
  title: string;
  length: number;
  lowCommercial?: Commercial;
  mediumCommercial?: Commercial;
  highCommercial?: Commercial;
}

export interface WatchListCommercialsVideosVO {
  id: number;
  title: string;
  length: number;
  lowCommercial: Commercial;
  mediumCommercial: Commercial;
  highCommercial: Commercial;
  videos: Video[];
}

export interface WatchListDTO {
  title: string;
  length: number;
  videos: Video[];
}

// export interface WatchListCommercialVO {
//   id: number;
//   title: string;
//   length: number;
//   videos: Video[];
//   lowYoutubeId?: string;
//   mediumYoutubeId?: string;
//   highYoutubeId?: string;
// }

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
  watchListTitle: string;
  watchListId: number;
  skipEnabled: boolean;
  showAfterVideoIdx: number;
  currentVideoIdx: number;
  watchListVideosVO: WatchListVideosVO;
  commercialYoutubeId: string;
  commercialSimilarityLevel: string;
}

export interface ExperimentData {
  id: string;
  participantId: string;
  watchListId: number;
  watchListTitle: string;
  currentVideoIdx: number;
  skipEnabled: boolean;
  showAfterVideoIdx: number;
  commercialYoutubeId: string;
  commercialSimilarityLevel: string;
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
  experimentId: string;
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

export enum SimilarityLevels {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
}
