import type { RootState } from "../../state/store";
import { useSelector } from "react-redux";
import InstructionsItem from "./InstructionsItem";
import ActionImage from "../ActionImage";
import TimeInput from "./TimeInput";
import { memo } from "react";

const InstructionsPanel = memo(() => {
  const chefInstructions = useSelector(
    (state: RootState) => state.actions.chefInstructions
  );

  console.log(chefInstructions.length);

  return chefInstructions.map((inst) => (
    <div
      key={`${inst.action.actionName}_${inst.id}`}
      className="flex center bg-slate-300"
    >
      <div className="mx-4 bg-yellow-200">
        <ActionImage action={inst.action} allowRemove={true} />
      </div>
      <span>THE</span>
      <div className="flex flex-row mx-4 bg-purple-400">
        {inst.items.map((item) => (
          <div key={`${inst.id}_${item.itemName}`} className="mx-2">
            <InstructionsItem groupName={inst.id.toString()} item={item} />
          </div>
        ))}
      </div>
      {inst.action.time !== -1 && (
        <div className="flex w-fit center bg-teal-400">
          <span>FOR</span>
          <TimeInput instruction={inst} />
          <span>{inst.action.unit}</span>
        </div>
      )}
    </div>
  ));
});

export default InstructionsPanel;
