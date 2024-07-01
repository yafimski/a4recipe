import type { RootState } from "../../state/store";
import { useDispatch, useSelector } from "react-redux";
import ActionImage from "../ActionImage";
import TimeInput from "./TimeInput";
import { memo } from "react";
import {
  type ChefInstruction,
  removeChefInstruction,
  setCurrentAction,
  setCurrentItems,
  setCurrentInstruction,
} from "../../state/chefActions/chefActionsSlice";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import IngredientImage from "../IngredientImage";
import { handleKeyDown } from "../../utils/helpers";
import InstructionNote from "./InstructionNote";

const InstructionsPanel = memo(() => {
  const dispatch = useDispatch();
  const chefInstructions = useSelector(
    (state: RootState) => state.actions.chefInstructions
  );
  const currentInstruction = useSelector(
    (state: RootState) => state.actions.currentInstruction
  );

  const handleRemoveInstruction = (inst: ChefInstruction) => {
    dispatch(removeChefInstruction(inst));
    dispatch(setCurrentAction(null));
    dispatch(setCurrentItems([]));
  };

  const handleInstructionClick = (e: React.MouseEvent, inst: ChefInstruction) => {
    e.stopPropagation();

    if (currentInstruction?.id !== inst.id) {
      dispatch(setCurrentAction(inst.action));
      dispatch(setCurrentItems(inst.items));
      dispatch(setCurrentInstruction(inst));
    } else {
      dispatch(setCurrentAction(null));
      dispatch(setCurrentItems([]));
      dispatch(setCurrentInstruction(null));
    }
  };

  const sortedChefInstructions = [...chefInstructions].sort((a, b) => a.id - b.id);

  return sortedChefInstructions.map((inst) => (
    <div key={`${inst.id}`} className="flex flex-col mb-16">
      <div className="flex items-center justify-between bg-slate-400 pl-16">
        <div className="flex center w-full bg-orange-200">
          <div
            className={`flex center bg-orange-500 ${
              currentInstruction?.id === inst.id && "border-selected"
            }`}
            onClick={(e) => handleInstructionClick(e, inst)}
            onKeyDown={handleKeyDown}
          >
            <div className="mx-4 py-2 bg-yellow-200">
              <ActionImage action={inst.action} allowRemove={false} />
            </div>
            <span>THE</span>
            <div
              className={`${
                inst.items.length < 3 ? "flex" : "grid"
              } gap-2 p-2 bg-purple-400`}
            >
              <div
                className={`${
                  inst.items.length < 3 ? "flex" : "grid grid-cols-3"
                } center`}
              >
                {inst.items.map((item) => (
                  <div
                    key={`${inst.id}_${item.itemName}`}
                    className="px-2 py-2 hover:scale-105"
                  >
                    <IngredientImage
                      groupName={inst.id.toString()}
                      itemName={item.itemName}
                      allowRemove={false}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          {inst.action.time !== -1 && (
            <div className="flex center bg-teal-400">
              <span>FOR</span>
              <TimeInput instruction={inst} />
              <span>{inst.action.unit}</span>
            </div>
          )}
        </div>
        <button
          type="button"
          className="px-4 ml-16 card-shadow h-fit bg-yellow-400"
          onClick={() => handleRemoveInstruction(inst)}
        >
          <FontAwesomeIcon icon={faTrash} size="lg" className="cursor-pointer" />
        </button>
      </div>
      <div className="flex center bg-green-500">
        <InstructionNote instruction={inst} />
      </div>
    </div>
  ));
});

export default InstructionsPanel;
