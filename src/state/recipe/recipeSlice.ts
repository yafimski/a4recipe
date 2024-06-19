import { createSlice } from "@reduxjs/toolkit";

interface RecipeState {
  name: string;
}

const initialState: RecipeState = {
  name: "My Recipe",
};

const recipeSlice = createSlice({
  name: "recipe",
  initialState,
  reducers: {},
});

export default recipeSlice.reducer;
