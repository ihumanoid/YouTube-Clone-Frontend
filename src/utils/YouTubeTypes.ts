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

export interface WatchListCommercialsVODep {
  id: number;
  title: string;
  length: number;
  lowCommercial?: Commercial;
  mediumCommercial?: Commercial;
  highCommercial?: Commercial;
}

export interface CommercialSimilarityVO {
  watchListId: string;
  commercialYoutubeId: string;
  similarityScore: number;
  title: string;
  thumbnailUrl: string;
  duration: string;
  description: string;
  channelTitle: string;
}

export interface WatchListCommercialsVideosVO {
  id: number;
  title: string;
  length: number;
  videos: Video[];
  lowSimilarity: CommercialSimilarityVO[];
  highSimilarity: CommercialSimilarityVO[];
}
export interface WatchListCommercialSimilarityVO {
  id: number;
  title: string;
  length: number;
  lowSimilarity: CommercialSimilarityVO[];
  highSimilarity: CommercialSimilarityVO[];
}

export interface WatchListDTO {
  title: string;
  length: number;
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
  watchListTitle: string;
  watchListId: number;
  skipEnabled: boolean;
  showAfterVideoIdx: number;
  currentVideoIdx: number;
  watchListCommercialsVideosVO: WatchListCommercialsVideosVO;
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
  knewBrand: boolean;
  knewProduct: boolean;
  seenAdvertisement: boolean;
}

export interface VideoTopic {
  id: string;
  topic: string;
}

export interface RandomParamsVO {
  giveDesiredWatchList: number;
  watchListIndex: number;
  skipEnabled: number;
  similarityLevel: number;
  similarityIndex: number;
  showAdAfterIndex: number;
}
export enum SimilarityLevels {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
}
