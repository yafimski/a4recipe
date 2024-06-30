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
  currentAction: ChefAction | null;
  currentItems: IngredientItem[];
}

const initialState: ChefInstructions = {
  chefInstructions: [],
  currentAction: null,
  currentItems: [],
};

const chefActionSlice = createSlice({
  name: "chefActions",
  initialState,
  reducers: {
    resetChefInstructions: (state) => {
      state.chefInstructions = [];
      state.currentAction = null;
      state.currentItems = [];
    },
    setCurrentAction: (state, action: PayloadAction<ChefAction | null>) => {
      state.currentAction = action.payload;
    },
    addToCurrentActionItems: (state, action: PayloadAction<IngredientItem>) => {
      state.currentItems = [...state.currentItems, action.payload];
    },
    removeFromCurrentActionItems: (state, action: PayloadAction<IngredientItem>) => {
      state.currentItems = state.currentItems.filter(
        (item) => !isEqual(item, action.payload)
      );
    },
    addChefInstruction: (state, action: PayloadAction<ChefInstruction>) => {
      console.log("addChefInstruction called with:", action.payload);
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
    updateInstructionTime: (
      state,
      action: PayloadAction<{ instruction: ChefInstruction; time: number }>
    ) => {
      const { instruction, time } = action.payload;

      const existingInstruction = state.chefInstructions.find((inst) =>
        isEqual(inst, instruction)
      );

      if (existingInstruction) {
        existingInstruction.action.time = time;
      }
    },
  },
});

export const {
  resetChefInstructions,
  addChefInstruction,
  removeChefInstruction,
  updateChefInstructionItems,
  setCurrentAction,
  addToCurrentActionItems,
  removeFromCurrentActionItems,
  updateInstructionTime,
} = chefActionSlice.actions;

export default chefActionSlice.reducer;
