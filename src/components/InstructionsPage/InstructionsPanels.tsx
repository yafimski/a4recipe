import type { RootState } from "../../state/store";
import { useDispatch, useSelector } from "react-redux";
import TimeInput from "./TimeInput";
import { memo } from "react";
import {
  type ChefInstruction,
  removeChefInstruction,
  setCurrentAction,
  setCurrentItems,
  setCurrentInstruction,
} from "../../state/chefActions/chefActionsSlice";
import { faBan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import IngredientImage from "../IngredientImage";
import InstructionNote from "./InstructionNote";
import ActionImageWithName from "../ActionImageWithName";
import { handleKeyDownPrevent } from "../../utils/helpers";
import type { IngredientItem } from "../../state/ingredientGroups/ingredientGroupsSlice";

interface InstructionPanelProps {
  onRefClick: (instruction: ChefInstruction, item?: IngredientItem) => void;
}

const InstructionsPanels = memo(({ onRefClick }: InstructionPanelProps) => {
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
      dispatch(setCurrentInstruction(inst));
    } else {
      dispatch(setCurrentAction(null));
      dispatch(setCurrentInstruction(null));
    }

    onRefClick(inst);
  };

  const handlePanelItemClick = (
    e: React.MouseEvent,
    inst: ChefInstruction,
    item: IngredientItem
  ) => {
    e.stopPropagation();

    if (currentInstruction?.id !== inst.id) {
      dispatch(setCurrentItems([item]));
      dispatch(setCurrentInstruction(inst));
    } else {
      dispatch(setCurrentItems([]));
      dispatch(setCurrentInstruction(null));
    }

    onRefClick(inst, item);
  };

  const sortedChefInstructions = [...chefInstructions].sort((a, b) => a.id - b.id);

  return sortedChefInstructions.map((inst) => (
    <div key={`${inst.id}`} className="flex flex-col mb-12">
      <div className="flex items-center justify-between pl-16">
        <div className="flex justify-start w-full py-2">
          <div className="flex center">
            <ActionImageWithName
              action={inst.action}
              chosenAction={null}
              allowRemove={false}
              onClickAction={(e) => {
                handleInstructionClick(e, inst);
              }}
            />
            <span className="instruction-word">THE</span>
            <div className={`${inst.items.length < 3 ? "flex" : "grid"} gap-2 p-2`}>
              <div
                className={`${
                  inst.items.length < 3 ? "flex" : "grid grid-cols-3"
                } center`}
              >
                {inst.items.map((item) => (
                  <div
                    key={`${inst.id}_${item.itemName}`}
                    className="px-2 py-2 hover:scale-110"
                    onClick={(e) => {
                      handlePanelItemClick(e, inst, item);
                    }}
                    onKeyDown={handleKeyDownPrevent}
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
            <div className="flex center">
              <span className="instruction-word">FOR</span>
              <TimeInput instruction={inst} />
              <span className="instruction-word">{inst.action.unit}</span>
            </div>
          )}
        </div>
        <button
          type="button"
          className="px-4 ml-16 h-fit"
          onClick={() => handleRemoveInstruction(inst)}
        >
          <FontAwesomeIcon
            icon={faBan}
            size="lg"
            color={"red"}
            className="cursor-pointer hover:text-black"
          />
        </button>
      </div>
      <div className="flex center">
        <InstructionNote instruction={inst} />
      </div>
    </div>
  ));
});

export default InstructionsPanels;
