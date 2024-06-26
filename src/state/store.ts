import { configureStore } from "@reduxjs/toolkit";
import recipeReducer from "./recipe/recipeSlice";
import ingredientGroupsReducer from "./ingredientGroups/ingredientGroupsSlice";
import warningReducer from "./warning/warningSlice";

export const store = configureStore({
  reducer: {
    recipe: recipeReducer,
    groups: ingredientGroupsReducer,
    warning: warningReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
