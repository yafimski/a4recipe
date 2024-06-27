import { configureStore } from "@reduxjs/toolkit";
import { allPossibleIngredients } from "../utils/data";
import type { RootState } from "../state/store";
import recipeReducer from "../state/recipe/recipeSlice";
import ingredientGroupsReducer from "../state/ingredientGroups/ingredientGroupsSlice";
import warningReducer from "../state/warning/warningSlice";

const initialState: RootState = {
  recipe: {
    title: "Mock recipe name",
    currentItem: "Mock item",
    currentGroupName: "Mock group",
    possibleItems: allPossibleIngredients,
    batches: 1,
  },
  groups: {
    ingredientsGroups: [
      {
        groupName: "Mock group",
        items: [{ itemName: "Mock item", amount: 2, unit: "Mock unit" }],
      },
    ],
  },
  warning: { warning: "" },
};

const createMockStore = (state: RootState = initialState) =>
  configureStore({
    reducer: {
      recipe: recipeReducer,
      groups: ingredientGroupsReducer,
      warning: warningReducer,
    },
    preloadedState: state,
  });

export default createMockStore;
