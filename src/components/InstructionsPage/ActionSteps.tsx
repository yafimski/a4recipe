import InstructionsItems from "./InstructionsItems";
import InstructionsActions from "./InstructionsActions";
import InstructionsPanels from "./InstructionsPanels";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../state/store";
import {
  type ChefInstruction,
  addChefInstruction,
  setCurrentAction,
  setCurrentInstruction,
  setCurrentItems,
} from "../../state/chefActions/chefActionsSlice";
import { useEffect, useRef, useState } from "react";
import { faAnglesLeft, faAnglesRight } from "@fortawesome/free-solid-svg-icons";
import Caret from "./Caret";
import type { IngredientItem } from "../../state/ingredientGroups/ingredientGroupsSlice";

function ActionSteps() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollRef2 = useRef<HTMLDivElement>(null);

  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [startX, setStartX] = useState<number>(0);
  const [scrollAmount, setScrollLeft] = useState<number>(0);

  const [currentRef, setCurrentRef] = useState<React.RefObject<HTMLDivElement> | null>(
    null
  );

  const dispatch = useDispatch();
  const chefInstructions = useSelector(
    (state: RootState) => state.actions.chefInstructions
  );

  const currentAction = useSelector((state: RootState) => state.actions.currentAction);

  const currentItems = useSelector((state: RootState) => state.actions.currentItems);

  const currentInstruction = useSelector(
    (state: RootState) => state.actions.currentInstruction
  );

  useEffect(() => {
    if (currentRef) {
      const scrollable = currentRef.current;

      const handleWheel = (e: WheelEvent) => {
        if (scrollable) {
          if (e.deltaY < 0) {
            scrollable.scrollLeft -= 5;
          } else {
            scrollable.scrollLeft += 5;
          }
        }
      };

      if (scrollable) {
        scrollable.addEventListener("wheel", handleWheel, { passive: true });
      }

      return () => {
        if (scrollable) {
          scrollable.removeEventListener("wheel", handleWheel);
        }
      };
    }
  });

  const scrollByItems = (direction: string) => {
    if (currentRef?.current) {
      const itemWidth = (currentRef.current.firstChild as HTMLElement).offsetWidth;

      const scrollAmount = itemWidth * 4;
      currentRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleMouseDown = (ref: React.RefObject<HTMLDivElement>, e: React.MouseEvent) => {
    if (!ref.current) return;
    setCurrentRef(ref);

    if (ref.current) {
      setIsDragging(true);
      setStartX(e.pageX - ref.current.offsetLeft);
      setScrollLeft(ref.current.scrollLeft);
    }
  };

  const handleMouseMove = (ref: React.RefObject<HTMLDivElement>, e: React.MouseEvent) => {
    if (!isDragging || !ref.current) return;
    setCurrentRef(ref);

    e.preventDefault();
    if (ref.current) {
      const x = e.pageX - ref.current.offsetLeft;
      const walk = x - startX;
      ref.current.scrollLeft = scrollAmount - walk;
    }
  };

  const handleAddInstruction = () => {
    if (currentAction !== null && currentItems.length > 0) {
      dispatch(
        addChefInstruction({
          id:
            chefInstructions.length > 0
              ? Math.max(...chefInstructions.map((inst) => inst.id)) + 1
              : 0,
          note: "",
          action: currentAction,
          items: currentItems,
        })
      );

      dispatch(setCurrentAction(null));
      dispatch(setCurrentItems([]));
    }
  };

  const handleResetInstruction = () => {
    dispatch(setCurrentInstruction(null));
    dispatch(setCurrentAction(null));
    dispatch(setCurrentItems([]));
  };

  const handleInstructionClick = (inst: ChefInstruction, item?: IngredientItem) => {
    let actionsScrollbar = scrollRef.current;
    let targetAction = null;

    if (item) {
      actionsScrollbar = scrollRef2.current;
      targetAction = actionsScrollbar?.querySelector(
        `[data-item-name="${item.itemName}"]`
      );
    } else {
      targetAction = actionsScrollbar?.querySelector(
        `[data-action-name="${inst.action.actionName}"]`
      );
    }

    if (targetAction) {
      targetAction.scrollIntoView({ behavior: "smooth", inline: "center" });
    }
  };

  const buttonDisabled =
    currentAction === null ||
    currentItems.length === 0 ||
    (currentAction !== null && currentInstruction !== null);

  return (
    <div className="mt-12 h-5/6 w-2/3 input-gallery-border overflow-y-hidden overflow-x-hidden p-4">
      <h2 className="text-fluidSubtitle">Plan how to use the ingredients!</h2>
      <div className="flex flex-row gap-2">
        <Caret icon={faAnglesLeft} onCaretClick={() => scrollByItems("left")} />
        <div
          id="actions-scrollbar"
          className="flex w-full overflow-x-scroll short-height px-2 py-4 pt-6 no-scrollbar"
          ref={scrollRef}
          onMouseDown={(e) => handleMouseDown(scrollRef, e)}
          onMouseLeave={() => setIsDragging(false)}
          onMouseUp={() => setIsDragging(false)}
          onMouseMove={(e) => handleMouseMove(scrollRef, e)}
        >
          <InstructionsActions />
        </div>
        <Caret icon={faAnglesRight} onCaretClick={() => scrollByItems("right")} />
      </div>
      <button
        type="button"
        disabled={buttonDisabled}
        className={`sexy-button mt-2 ${
          buttonDisabled
            ? "bg-gray-100 text-gray-400 shadow-none border border-gray-300"
            : " bg-blue-500 text-white"
        }`}
        onClick={() => handleAddInstruction()}
      >
        Add Instruction
      </button>
      <div className="flex w-full justify-between">
        <div
          ref={scrollRef2}
          className="flex flex-col min-w-fit p-4 half-height no-scrollbar overflow-scroll"
        >
          <InstructionsItems />
        </div>
        <div
          className="w-full mx-8 half-height overflow-scroll no-scrollbar"
          onClick={() => handleResetInstruction()}
          onKeyDown={() => {
            return;
          }}
        >
          <InstructionsPanels
            onRefClick={(instruction, item) => handleInstructionClick(instruction, item)}
          />
        </div>
      </div>
    </div>
  );
}

export default ActionSteps;
