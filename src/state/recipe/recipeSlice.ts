import { type PayloadAction, createSlice } from "@reduxjs/toolkit";
import { allPossibleIngredients } from "../../utils/data";

export interface RecipeState {
  title: string;
  currentItem: string;
  currentGroupName: string;
  possibleItems: string[];
  batches: number;
  invalidState: boolean;
}

const initialState: RecipeState = {
  title: "Mock",
  currentItem: "",
  currentGroupName: "",
  possibleItems: allPossibleIngredients,
  batches: 1,
  invalidState: false,
};

const recipeSlice = createSlice({
  name: "recipe",
  initialState,
  reducers: {
    resetRecipe: (state) => {
      state.title = "";
      state.currentItem = "";
      state.currentGroupName = "";
      state.possibleItems = allPossibleIngredients;
      state.batches = 1;
      state.invalidState = false;
    },
    toggleInvalidState: (state) => {
      state.invalidState = !state.invalidState;
    },
    nameRecipe: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    nameGroup: (state, action: PayloadAction<string>) => {
      state.currentGroupName = action.payload;
    },
    setItem: (state, action: PayloadAction<string>) => {
      state.currentItem = action.payload;
    },
    updatePossibleItems: (state, action: PayloadAction<string>) => {
      state.possibleItems = allPossibleIngredients.filter((item) =>
        item.toLowerCase().includes(action.payload.toLowerCase())
      );
    },
    setBatches: (state, action: PayloadAction<number>) => {
      state.batches = action.payload;
    },
  },
});

export const {
  nameRecipe,
  nameGroup,
  setItem,
  updatePossibleItems,
  setBatches,
  resetRecipe,
  toggleInvalidState,
} = recipeSlice.actions;

export default recipeSlice.reducer;
