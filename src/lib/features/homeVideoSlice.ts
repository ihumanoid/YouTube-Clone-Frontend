import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  AIVideos,
  SportsVideos,
  FashionVideos,
  FoodVideos,
  GamingVideos,
} from "@/utils/DummyData";

const initialState = AIVideos;

export const homeVideoSlice = createSlice({
  name: "homeVideoSlice",
  initialState: AIVideos,
  reducers: {
    changeWatchList: (state, action: PayloadAction<string>) => {
      const watchlistId = action.payload;
      switch (watchlistId) {
        case "ai":
          return AIVideos;
        case "sports":
          return SportsVideos;
        case "fashion":
          return FashionVideos;
        case "food":
          return FoodVideos;
        case "gaming":
          return GamingVideos;
      }
    },
  },
});

export const { changeWatchList } = homeVideoSlice.actions;
export const homeVideoSliceReducer = homeVideoSlice.reducer;
