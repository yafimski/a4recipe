import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

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
  ingredientsGroups: [],
};

const ingredientGroupsSlice = createSlice({
  name: "groups",
  initialState,
  reducers: {
    resetIngredientGroup: (state) => {
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
          unit: "none",
        };
        existingGroup.items.push(updatedItem);
      } else {
        state.ingredientsGroups.push({
          groupName,
          items: [{ itemName, amount: 0, unit: "none" }],
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
  resetIngredientGroup,
} = ingredientGroupsSlice.actions;

export default ingredientGroupsSlice.reducer;
