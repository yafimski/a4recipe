import { type PayloadAction, createSlice } from "@reduxjs/toolkit";
import { allPossibleIngredients } from "../../utils/data";

interface RecipeState {
  title: string;
  currentItem: string;
  currentGroupName: string;
  possibleItems: string[];
  batches: number;
}

const initialState: RecipeState = {
  title: "",
  currentItem: "",
  currentGroupName: "",
  possibleItems: allPossibleIngredients,
  batches: 1,
};

const recipeSlice = createSlice({
  name: "recipe",
  initialState,
  reducers: {
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

export const { nameRecipe, nameGroup, setItem, updatePossibleItems, setBatches } =
  recipeSlice.actions;

export default recipeSlice.reducer;
