import { configureStore } from "@reduxjs/toolkit";
import { allPossibleIngredients } from "../utils/data";
import type { RootState } from "../state/store";
import recipeReducer from "../state/recipe/recipeSlice";
import ingredientGroupsReducer from "../state/ingredientGroups/ingredientGroupsSlice";
import chefActionsReducer from "../state/chefActions/chefActionsSlice";
import warningReducer from "../state/warning/warningSlice";

const initialState: RootState = {
  recipe: {
    title: "Mock recipe name",
    currentItem: "Mock item",
    currentGroupName: "Mock group",
    possibleItems: allPossibleIngredients,
    batches: 1,
    invalidState: false,
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
  actions: {
    chefInstructions: [
      {
        id: 0,
        action: {
          actionName: "Mock action",
          time: 30,
          unit: "min",
          equipment: "Mock equipment",
        },
        items: [{ itemName: "Mock item", amount: 2, unit: "Mock unit" }],
      },
    ],
  },
};

const createMockStore = (state: RootState = initialState) =>
  configureStore({
    reducer: {
      recipe: recipeReducer,
      actions: chefActionsReducer,
      groups: ingredientGroupsReducer,
      warning: warningReducer,
    },
    preloadedState: state,
  });

export default createMockStore;
