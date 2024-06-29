import { type PayloadAction, createSlice } from "@reduxjs/toolkit";
import type { IngredientItem } from "../ingredientGroups/ingredientGroupsSlice";
import { isEqual } from "lodash";

export interface ChefAction {
  actionName: string;
  time: number;
  unit: string;
  equipment: string;
}

export interface ChefInstruction {
  id: number;
  action: ChefAction;
  items: IngredientItem[];
}

export interface ChefInstructions {
  chefInstructions: ChefInstruction[];
}

const initialState: ChefInstructions = {
  chefInstructions: [],
};

const chefActionSlice = createSlice({
  name: "chefActions",
  initialState,
  reducers: {
    resetChefInstructions: (state) => {
      state.chefInstructions = [];
    },
    addChefInstruction: (state, action: PayloadAction<ChefInstruction>) => {
      state.chefInstructions.push(action.payload);
    },
    removeChefInstruction: (state, action: PayloadAction<ChefInstruction>) => {
      const existingInstruction = state.chefInstructions.find((inst) =>
        isEqual(inst, action.payload)
      );

      if (existingInstruction) {
        state.chefInstructions = state.chefInstructions.filter(
          (inst) => !isEqual(inst, action.payload)
        );
      }
    },
    updateChefInstructionItems: (
      state,
      action: PayloadAction<{ id: number; items: IngredientItem[] }>
    ) => {
      const existingInstruction = state.chefInstructions.find(
        (inst) => inst.id === action.payload.id
      );

      if (existingInstruction) {
        const updatedInstruction = {
          ...existingInstruction,
          items: action.payload.items,
        };

        state.chefInstructions = state.chefInstructions.filter(
          (inst) => !isEqual(inst, existingInstruction)
        );
        state.chefInstructions.push(updatedInstruction);
      }
    },
  },
});

export const {
  resetChefInstructions,
  addChefInstruction,
  removeChefInstruction,
  updateChefInstructionItems,
} = chefActionSlice.actions;

export default chefActionSlice.reducer;
