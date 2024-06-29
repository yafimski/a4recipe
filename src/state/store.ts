import { configureStore } from "@reduxjs/toolkit";
import recipeReducer from "./recipe/recipeSlice";
import ingredientGroupsReducer from "./ingredientGroups/ingredientGroupsSlice";
import warningReducer from "./warning/warningSlice";
import chefActionsReducer, {
  type ChefInstructions,
} from "./chefActions/chefActionsSlice";
import type { RecipeState } from "./recipe/recipeSlice";
import type { ItemsGroups } from "./ingredientGroups/ingredientGroupsSlice";
import type { WarningState } from "./warning/warningSlice";

export interface RootState {
  recipe: RecipeState;
  groups: ItemsGroups;
  actions: ChefInstructions;
  warning: WarningState;
}

export const store = configureStore({
  reducer: {
    recipe: recipeReducer,
    groups: ingredientGroupsReducer,
    actions: chefActionsReducer,
    warning: warningReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
