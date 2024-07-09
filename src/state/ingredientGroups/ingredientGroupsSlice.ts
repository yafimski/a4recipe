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
      groupName: "testing 1",
      items: [
        { itemName: "Olive oil", amount: 1, unit: "piece" },
        { itemName: "Banana", amount: 1, unit: "piece" },
        { itemName: "Green olives", amount: 1, unit: "piece" },
        { itemName: "Almonds", amount: 1, unit: "piece" },
        { itemName: "Yellow Bell Pepper", amount: 1, unit: "piece" },
        { itemName: "Water", amount: 1, unit: "piece" },
        { itemName: "Chickpeas", amount: 250, unit: "g" },
      ],
    },
    {
      groupName: "test 2",
      items: [
        { itemName: "Black beans", amount: 1, unit: "piece" },
        { itemName: "Leek", amount: 1, unit: "piece" },
        { itemName: "Coconut oil", amount: 1, unit: "piece" },
        { itemName: "Yeast", amount: 1, unit: "piece" },
        { itemName: "Baking powder", amount: 1, unit: "piece" },
      ],
    },
  ],
};

const ingredientGroupsSlice = createSlice({
  name: "groups",
  initialState,
  reducers: {
    setIngredientsGroups: (_, action: PayloadAction<ItemsGroups>) => {
      return action.payload;
    },
    resetIngredientsGroups: (state) => {
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
    updateAllmounts: (
      state,
      action: PayloadAction<{ batch: number; divider: number }>
    ) => {
      for (const group of state.ingredientsGroups) {
        for (const item of group.items) {
          item.amount /= action.payload.divider;
          item.amount *= action.payload.batch;
        }
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
  setIngredientsGroups,
  resetIngredientsGroups,
  addItemToIngredientGroup,
  removeItemFromIngredientGroup,
  updateAmount,
  updateAllmounts,
  updateUnit,
} = ingredientGroupsSlice.actions;

export default ingredientGroupsSlice.reducer;
