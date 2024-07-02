import { useEffect, useRef, useState } from "react";
import {
  type ChefInstruction,
  updateInstructionNote,
  setCurrentInstruction,
} from "../../state/chefActions/chefActionsSlice";
import { useDispatch } from "react-redux";
import { faClose, faPlus } from "@fortawesome/free-solid-svg-icons";
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
    console.log(e.target.value);
    setCurrentNoteText(e.target.value);
  };

  const showInput = addingNoteId === instruction.id;

  useEffect(() => {
    if (showInput && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showInput]);

  return showInput || instruction.note ? (
    <div className="flex justify-end items-center w-96 bg-gray-400">
      <input
        type="text"
        ref={inputRef}
        className="input-border w-full text-sm text-center"
        placeholder="Add a note to this instruction"
        value={currentNoteText}
        onChange={handleNoteText}
        onBlur={(e) => handleBlur(e.target.value)}
        onFocus={() => dispatch(setCurrentInstruction(instruction))}
      />
      <FontAwesomeIcon
        icon={faClose}
        size="1x"
        className="absolute mr-4 cursor-pointer"
        onClick={() => handleCancelNote()}
      />
    </div>
  ) : (
    <button
      type="button"
      className="flex center p-1 -m-1 w-16 card-shadow bg-blue-600 text-white rounded-2xl text-xs"
      onClick={() => setAddingNoteId(instruction.id)}
    >
      <FontAwesomeIcon icon={faPlus} size="sm" className="cursor-pointer" />
      <span className="ml-1">Note</span>
    </button>
  );
}

export default InstructionNote;
