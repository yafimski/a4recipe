import { useEffect, useRef, useState } from "react";
import {
  type ChefInstruction,
  updateInstructionNote,
  setCurrentInstruction,
} from "../../state/chefActions/chefActionsSlice";
import { useDispatch } from "react-redux";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function InstructionNote({ instruction }: { instruction: ChefInstruction }) {
  const inputRef = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch();

  const [currentNoteText, setCurrentNoteText] = useState<string>(instruction.note);
  const [addingNoteId, setAddingNoteId] = useState<number | null>(null);

  const handleBlur = (note: string) => {
    if (!currentNoteText) {
      setAddingNoteId(null);
      dispatch(updateInstructionNote({ id: instruction.id, note: "" }));
    } else {
      dispatch(updateInstructionNote({ id: instruction.id, note }));
    }
  };

  const handleCancelNote = () => {
    setAddingNoteId(null);
    setCurrentNoteText("");
    dispatch(updateInstructionNote({ id: instruction.id, note: "" }));
  };

  const handleNoteText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentNoteText(e.target.value);
  };

  const showInput = addingNoteId === instruction.id;

  useEffect(() => {
    if (showInput && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showInput]);

  const handleKeyDownBlur = (
    e: React.KeyboardEvent<HTMLInputElement>,
    instruction: ChefInstruction
  ) => {
    if (e.key === "Enter") {
      const { id, note } = instruction;
      dispatch(updateInstructionNote({ id, note }));
      (e.target as HTMLInputElement).blur();
    }
  };

  return showInput || instruction.note ? (
    <div className="flex justify-end items-center w-96">
      <input
        type="text"
        ref={inputRef}
        className="input-border w-full text-sm text-center -m-4 text-ellipsis whitespace-nowrap overflow-hidden"
        placeholder="Add a note to this instruction"
        value={currentNoteText}
        onChange={handleNoteText}
        onBlur={(e) => handleBlur(e.target.value)}
        onFocus={() => dispatch(setCurrentInstruction(instruction))}
        onKeyDown={(e) => handleKeyDownBlur(e, instruction)}
      />
      <FontAwesomeIcon
        icon={faClose}
        size="1x"
        className="absolute bg-white pl-2 cursor-pointer"
        onClick={() => handleCancelNote()}
      />
    </div>
  ) : (
    <button
      type="button"
      className="sexy-button px-3 py-2 -m-4 min-w-16 card-shadow border border-transparent bg-yellow-100 text-neutral-800 font-semibold rounded-lg text-xs hover:bg-white hover:border-2 hover:border-yellow-200"
      onClick={() => setAddingNoteId(instruction.id)}
    >
      <span>Add Note</span>
    </button>
  );
}

export default InstructionNote;
