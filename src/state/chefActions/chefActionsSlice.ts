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
  note: string;
  action: ChefAction;
  items: IngredientItem[];
  customItem?: string;
}

export interface ChefInstructions {
  chefInstructions: ChefInstruction[];
  currentInstruction: ChefInstruction | null;
  availableItems: IngredientItem[];
}

const initialState: ChefInstructions = {
  chefInstructions: [],
  currentInstruction: null,
  availableItems: [],
};

const chefActionSlice = createSlice({
  name: "chefActions",
  initialState,
  reducers: {
    setChefInstructions: (_, action: PayloadAction<ChefInstructions>) => {
      return action.payload;
    },
    resetChefInstructions: (state) => {
      state.chefInstructions = [];
    },
    setCustomInstructionItem: (
      state,
      action: PayloadAction<{ id: number; customItem: string }>
    ) => {
      const existingInstruction = state.chefInstructions.find(
        (inst) => inst.id === action.payload.id
      );

      if (existingInstruction) {
        existingInstruction.customItem = action.payload.customItem;
      }
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
    updateInstructionAction: (
      state,
      action: PayloadAction<{ id: number; action: ChefAction }>
    ) => {
      const existingInstruction = state.chefInstructions.find(
        (inst) => inst.id === action.payload.id
      );

      if (existingInstruction) {
        existingInstruction.action = action.payload.action;
      }
    },
    updateInstructionNote: (
      state,
      action: PayloadAction<{ id: number; note: string }>
    ) => {
      const existingInstruction = state.chefInstructions.find(
        (inst) => inst.id === action.payload.id
      );

      if (existingInstruction) {
        existingInstruction.note = action.payload.note;
      }
    },
    setAvailableItems: (state, action: PayloadAction<IngredientItem[]>) => {
      state.availableItems = action.payload;
    },
    updateAvailableItem: (state, action: PayloadAction<IngredientItem>) => {
      const firstIdxMatch = state.availableItems.findIndex((item) =>
        isEqual(item, action.payload)
      );

      if (firstIdxMatch === -1) {
        state.availableItems.push(action.payload);
      } else {
        state.availableItems.splice(firstIdxMatch, 1);
      }
    },
    updateAvailableItems: (state, action: PayloadAction<IngredientItem[]>) => {
      state.availableItems.push(...action.payload);
    },
  },
});

export const {
  setChefInstructions,
  resetChefInstructions,
  setCustomInstructionItem,
  addChefInstruction,
  removeChefInstruction,
  updateChefInstructionItems,
  updateInstructionTime,
  updateInstructionAction,
  updateInstructionNote,
  setAvailableItems,
  updateAvailableItem,
  updateAvailableItems,
} = chefActionSlice.actions;

export default chefActionSlice.reducer;
