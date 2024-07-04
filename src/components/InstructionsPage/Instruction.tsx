import { faBan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  removeChefInstruction,
  updateAvailableItems,
  updateChefInstructionItems,
  type ChefInstruction,
} from "../../state/chefActions/chefActionsSlice";
import { handleKeyDownPrevent } from "../../utils/helpers";
import InstructionNote from "./InstructionNote";
import TimeInput from "./TimeInput";
import { useDroppable } from "@dnd-kit/core";
import { useDispatch } from "react-redux";
import { isEqual } from "lodash";
import type { IngredientItem } from "../../state/ingredientGroups/ingredientGroupsSlice";
import ActionImageNeutral from "../ActionImageNeutral";
import IngredientImageNeutral from "../IngredientImageNeutral";

interface InstructionProps {
  instruction: ChefInstruction;
  refClick: (inst: ChefInstruction) => void;
}

function Instruction({ instruction, refClick }: InstructionProps) {
  const { setNodeRef } = useDroppable({
    id: instruction.id,
    data: {
      type: "Instruction",
      instruction,
    },
  });

  const dispatch = useDispatch();

  const handleRemoveItemFromInstruction = (
    item: IngredientItem,
    inst: ChefInstruction
  ) => {
    const updatedItems = inst.items.filter((currItem) => !isEqual(currItem, item));
    dispatch(updateChefInstructionItems({ id: inst.id, items: updatedItems }));

    dispatch(updateAvailableItems(item));
  };

  const handleRemoveInstruction = (inst: ChefInstruction) => {
    dispatch(removeChefInstruction(inst));
  };

  const { id, action, items } = instruction;

  return (
    <div
      ref={setNodeRef}
      key={`${id}_${action}`}
      className="z-50 flex flex-col mb-12 border-b border-gray-200 bg-yellow-200"
    >
      <div className="flex items-center justify-between pl-16">
        <div className="flex justify-start w-full py-2">
          <div
            draggable="false"
            className="flex center"
            onClick={() => {
              refClick(instruction);
            }}
            onKeyDown={handleKeyDownPrevent}
          >
            <ActionImageNeutral action={action} />
            <span className="instruction-word">THE</span>
            <div className={`${items.length < 3 ? "flex" : "grid"} gap-2 p-2`}>
              <div className={`${items.length < 3 ? "flex" : "grid grid-cols-3"} center`}>
                {items.length > 0 ? (
                  items.map((item) => (
                    <div key={`${id}_${item.itemName}`} className="px-2 py-2">
                      <IngredientImageNeutral
                        groupName={id.toString()}
                        item={item}
                        onRemoveItem={(item) =>
                          handleRemoveItemFromInstruction(item, instruction)
                        }
                      />
                    </div>
                  ))
                ) : (
                  <span key={id} className="instruction-word text-5xl">
                    ??
                  </span>
                )}
              </div>
            </div>
          </div>
          {action.time !== -1 && (
            <div className="flex center">
              <span className="instruction-word">FOR</span>
              <TimeInput instruction={instruction} />
              <span className="instruction-word">{action.unit}</span>
            </div>
          )}
        </div>
        <button
          type="button"
          className="px-4 ml-16 h-fit"
          onClick={() => handleRemoveInstruction(instruction)}
        >
          <FontAwesomeIcon
            icon={faBan}
            size="lg"
            color={"red"}
            className="cursor-pointer hover:text-black"
          />
        </button>
      </div>
      <div className="flex center mt-6">
        <InstructionNote instruction={instruction} />
      </div>
    </div>
  );
}

export default Instruction;
