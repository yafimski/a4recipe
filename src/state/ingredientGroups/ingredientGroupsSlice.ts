import { type PayloadAction, createSlice } from "@reduxjs/toolkit";
import { defUnit } from "../../utils/helpers";

export interface IngredientItem {
  itemName: string;
  amount: number;
  unit: string;
}

export interface ItemsGroup {
  groupName: string;
  items: IngredientItem[];
}

export interface ItemsGroups {
  ingredientsGroups: ItemsGroup[];
}

const initialState: ItemsGroups = {
  ingredientsGroups: [
    {
      groupName: "a",
      items: [
        { itemName: "Garlic", amount: 1, unit: "g" },
        { itemName: "Apples", amount: 4, unit: "whole" },
        { itemName: "Olive oil", amount: 1, unit: "l" },
        { itemName: "Water", amount: 1, unit: "l" },
        { itemName: "Lemon zest", amount: 1, unit: "l" },
        { itemName: "Kale", amount: 1, unit: "l" },
      ],
    },
    {
      groupName: "asdv",
      items: [
        { itemName: "Garlic", amount: 1, unit: "g" },
        { itemName: "Water", amount: 1, unit: "l" },
      ],
    },
    {
      groupName: "c",
      items: [
        { itemName: "Garlic", amount: 1, unit: "g" },
        { itemName: "Apples", amount: 4, unit: "whole" },
        { itemName: "Olive oil", amount: 1, unit: "l" },
        { itemName: "Water", amount: 1, unit: "l" },
        { itemName: "Lemon zest", amount: 1, unit: "l" },
      ],
    },
    {
      groupName: "d",
      items: [
        { itemName: "Apples", amount: 4, unit: "whole" },
        { itemName: "Olive oil", amount: 1, unit: "l" },
        { itemName: "Water", amount: 1, unit: "l" },
      ],
    },
  ],
};

const ingredientGroupsSlice = createSlice({
  name: "groups",
  initialState,
  reducers: {
    resetIngredientsGroup: (state) => {
      state.ingredientsGroups = [];
    },
    addItemToIngredientGroup: (
      state,
      action: PayloadAction<{ groupName: string; itemName: string }>
    ) => {
      const { groupName, itemName } = action.payload;
      const existingGroup = state.ingredientsGroups.find(
        (g) => g.groupName === groupName
      );

      if (existingGroup) {
        const updatedItem = {
          itemName,
          amount: 0,
          unit: defUnit,
        };
        existingGroup.items.push(updatedItem);
      } else {
        state.ingredientsGroups.push({
          groupName,
          items: [{ itemName, amount: 0, unit: defUnit }],
        });
      }
    },
    removeItemFromIngredientGroup: (
      state,
      action: PayloadAction<{ groupName: string; itemName: string }>
    ) => {
      const { groupName, itemName } = action.payload;
      const existingGroup = state.ingredientsGroups.find(
        (g) => g.groupName === groupName
      );

      if (existingGroup) {
        const index = existingGroup.items.findIndex((item) => item.itemName === itemName);

        if (index > -1) {
          existingGroup.items.splice(index, 1);
        }

        if (existingGroup?.items.length === 0) {
          state.ingredientsGroups = state.ingredientsGroups.filter(
            (g) => g.groupName !== groupName
          );
        }
      }
    },
    updateAmount: (
      state,
      action: PayloadAction<{ groupName: string; itemName: string; amount: number }>
    ) => {
      const { groupName, itemName, amount } = action.payload;

      const existingGroup = state.ingredientsGroups.find(
        (g) => g.groupName === groupName
      );

      const existingIngredient = existingGroup?.items.filter(
        (item) => item.itemName === itemName
      );

      if (existingIngredient) {
        existingIngredient[0].amount = amount;
      }
    },
    updateUnit: (
      state,
      action: PayloadAction<{ groupName: string; itemName: string; unit: string }>
    ) => {
      const { groupName, itemName, unit } = action.payload;

      const existingGroup = state.ingredientsGroups.find(
        (g) => g.groupName === groupName
      );

      const existingIngredient = existingGroup?.items.filter(
        (item) => item.itemName === itemName
      );

      if (existingIngredient) {
        existingIngredient[0].unit = unit;
      }
    },
  },
});

export const {
  addItemToIngredientGroup,
  removeItemFromIngredientGroup,
  updateAmount,
  updateUnit,
  resetIngredientsGroup,
} = ingredientGroupsSlice.actions;

export default ingredientGroupsSlice.reducer;
