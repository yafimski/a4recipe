import InstructionsItems from "./InstructionsItems";
import InstructionsActions from "./InstructionsActions";
import InstructionsPanels from "./InstructionsPanels";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../state/store";
import {
  addChefInstruction,
  setCurrentAction,
  setCurrentInstruction,
  setCurrentItems,
} from "../../state/chefActions/chefActionsSlice";
import { handleKeyDown } from "../../utils/helpers";
import { useEffect, useRef } from "react";
import { faAnglesLeft, faAnglesRight } from "@fortawesome/free-solid-svg-icons";
import Caret from "./Caret";

function ActionSteps() {
  const dispatch = useDispatch();
  const chefInstructions = useSelector(
    (state: RootState) => state.actions.chefInstructions
  );

  const currentAction = useSelector((state: RootState) => state.actions.currentAction);

  const currentItems = useSelector((state: RootState) => state.actions.currentItems);

  const currentInstruction = useSelector(
    (state: RootState) => state.actions.currentInstruction
  );

  const scrollableRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const scrollable = scrollableRef.current;

    const handleWheel = (e: WheelEvent) => {
      if (scrollable) {
        if (e.deltaY < 0) {
          scrollable.scrollLeft -= 100;
        } else {
          scrollable.scrollLeft += 100;
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
  });

  const scrollToStart = () => {
    if (scrollableRef.current) {
      scrollableRef.current.scrollTo({ left: 0, behavior: "smooth" });
    }
  };

  const scrollToEnd = () => {
    if (scrollableRef.current) {
      scrollableRef.current.scrollTo({
        left: scrollableRef.current.scrollWidth,
        behavior: "smooth",
      });
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

  const buttonDisabled =
    currentAction === null ||
    currentItems.length === 0 ||
    (currentAction !== null && currentInstruction !== null);

  return (
    <div className="mt-12 h-5/6 w-2/3 input-gallery-border overflow-y-hidden overflow-x-hidden p-4 bg-slate-200">
      <h1 className="text-fluidSubtitle mb-4">Plan how to use the ingredients!</h1>
      <div className="flex flex-row gap-2">
        <Caret icon={faAnglesLeft} onCaretClick={() => scrollToStart()} />
        <div
          ref={scrollableRef}
          className="flex w-full overflow-x-scroll bg-green-400 short-height"
        >
          <InstructionsActions />
        </div>
        <Caret icon={faAnglesRight} onCaretClick={() => scrollToEnd()} />
      </div>
      <button
        type="button"
        disabled={buttonDisabled}
        className={`bg-blue-500 w-40 font-semibold rounded-3xl mb-4 py-2 card-shadow ${
          buttonDisabled ? "bg-gray-300 text-gray-400 shadow-none" : "text-white"
        }`}
        onClick={() => handleAddInstruction()}
      >
        Add Instruction
      </button>
      <div className="flex w-full justify-between">
        <div className="ml-4 w-fit bg-red-300 half-height">
          <InstructionsItems />
        </div>
        <div
          className="w-full mx-8 bg-blue-300 half-height"
          onClick={() => handleResetInstruction()}
          onKeyDown={handleKeyDown}
        >
          <InstructionsPanels />
        </div>
      </div>
    </div>
  );
}

export default ActionSteps;
