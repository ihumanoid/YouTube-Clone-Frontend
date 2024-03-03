import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { WatchListVO } from "@/utils/YouTubeTypes";

export interface WatchListReducerState {
  watchLists: WatchListVO[];
  keyword: string;
}

const initialState: WatchListReducerState = {
  watchLists: [],
  keyword: "",
};

export const watchListSlice = createSlice({
  name: "watchListSlice",
  initialState,
  reducers: {
    changeAllWatchLists: (state, action: PayloadAction<WatchListVO[]>) => {
      return {
        ...state,
        watchLists: action.payload,
      };
    },
    changeKeyword: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        keyword: action.payload,
      };
    },
  },
});

export const { changeAllWatchLists, changeKeyword } = watchListSlice.actions;
export const watchListSliceReducer = watchListSlice.reducer;
