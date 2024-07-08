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
        { itemName: "Black beans", amount: 1, unit: "liter" },
        { itemName: "Almond milk", amount: 1, unit: "liter" },
      ],
    },
    {
      groupName: "asdv",
      items: [
        { itemName: "Kale", amount: 1, unit: "liter" },
        { itemName: "Lemon zest", amount: 1, unit: "liter" },
        { itemName: "Onion", amount: 1, unit: "g" },
        { itemName: "Milk", amount: 1, unit: "liter" },
        { itemName: "Walnuts", amount: 1, unit: "liter" },
      ],
    },
    {
      groupName: "c",
      items: [
        { itemName: "Olive oil", amount: 1, unit: "liter" },
        { itemName: "Water", amount: 1, unit: "liter" },
        { itemName: "White Chocolate", amount: 1, unit: "liter" },
        { itemName: "Black olives", amount: 1, unit: "liter" },
        { itemName: "Almonds", amount: 1, unit: "liter" },
      ],
    },
    {
      groupName: "dry stuff",
      items: [
        { itemName: "Banana", amount: 1, unit: "liter" },
        { itemName: "Feta Cheese", amount: 1, unit: "liter" },
        { itemName: "Parmesan Cheese", amount: 1, unit: "liter" },
        { itemName: "Leek", amount: 1, unit: "liter" },
        { itemName: "Butter", amount: 1, unit: "liter" },
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
      action: PayloadAction<{
        groupName: string;
        itemName: string;
        item?: IngredientItem;
      }>
    ) => {
      const { groupName, itemName, item } = action.payload;
      const existingGroup = state.ingredientsGroups.find(
        (g) => g.groupName === groupName
      );

      if (existingGroup) {
        if (item) {
          existingGroup.items.push(item);
        } else {
          const updatedItem = {
            itemName,
            amount: 0,
            unit: defUnit,
          };
          existingGroup.items.push(updatedItem);
        }
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

        if (index !== -1) {
          existingGroup.items.splice(index, 1);
        }

        if (existingGroup.items.length === 0) {
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
