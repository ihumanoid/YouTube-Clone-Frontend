import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { WatchListVO } from "@/utils/YouTubeTypes";

export interface WatchListReducerState {
  watchLists: WatchListVO[];
}

const initialState: WatchListReducerState = {
  watchLists: [],
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
  },
});

export const { changeAllWatchLists } = watchListSlice.actions;
export const watchListSliceReducer = watchListSlice.reducer;
