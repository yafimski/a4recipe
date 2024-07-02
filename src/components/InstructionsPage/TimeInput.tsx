import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import {
  type ChefInstruction,
  updateInstructionTime,
} from "../../state/chefActions/chefActionsSlice";

interface TimeInputProps {
  instruction: ChefInstruction;
}

function TimeInput({ instruction }: TimeInputProps) {
  const dispatch = useDispatch();
  const [localTime, setLocalTime] = useState<number>(instruction.action.time);

  const handleFocus = (e: { target: { select: () => void } }) => {
    e.target.select();
  };

  const handleTimeChange = (time: number) => {
    if (Number.isNaN(time)) {
      setLocalTime(0);
    } else {
      setLocalTime(time);
    }
  };

  const handleSubtract = () => {
    if (localTime > 0) {
      setLocalTime((prev) => prev - 1);
    }
  };

  const handleAdd = () => {
    setLocalTime((prev) => prev + 1);
  };

  useEffect(() => {
    dispatch(updateInstructionTime({ instruction, time: localTime }));
  }, [dispatch, instruction, localTime]);

  console.log(localTime);

  return (
    <div className="flex flex-row rounded-md mx-2">
      <button type="button" onClick={handleSubtract}>
        <FontAwesomeIcon icon={faMinus} className="num-input-icons" />
      </button>
      <input
        className={`w-16 p-0 mx-4 focus:outline-none text-center rounded-2xl text-5xl ${
          localTime === 0 && "required-element-fill"
        }`}
        type="number"
        id="units-number-input"
        value={localTime}
        required
        onChange={(e) => handleTimeChange(Number.parseFloat(e.target.value))}
        onFocus={handleFocus}
        onWheel={(e) => (e.target as HTMLElement).blur()}
      />
      <button type="button" onClick={handleAdd}>
        <FontAwesomeIcon icon={faPlus} className="num-input-icons" />
      </button>
    </div>
  );
}

export default TimeInput;