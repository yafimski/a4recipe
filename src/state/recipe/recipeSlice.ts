import { type PayloadAction, createSlice } from "@reduxjs/toolkit";
import { allPossibleIngredients } from "../../utils/data";

interface RecipeState {
  title: string;
  currentItem: string;
  currentGroupName: string;
  possibleItems: string[];
}

const initialState: RecipeState = {
  title: "",
  currentItem: "",
  currentGroupName: "",
  possibleItems: allPossibleIngredients,
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
  },
});

export const { nameRecipe, nameGroup, setItem, updatePossibleItems } =
  recipeSlice.actions;

export default recipeSlice.reducer;
