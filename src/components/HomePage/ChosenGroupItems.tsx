import { useDroppable } from "@dnd-kit/core";
import type { ItemsGroup } from "../../state/ingredientGroups/ingredientGroupsSlice";
import DraggableGroupItem from "./DraggableGroupItem";

interface ChosenGroupItemsProps {
  group: ItemsGroup;
}

function ChosenGroupItems({ group }: ChosenGroupItemsProps) {
  const { setNodeRef } = useDroppable({
    id: group.groupName,
    data: {
      type: "Group",
      group,
    },
  });

  return (
    <>
      <div
        ref={setNodeRef}
        className="flex flex-wrap justify-center gap-y-4 mb-12 center"
      >
        {group.items.map((item, index) => (
          <div key={`${item}${index.toString()}`}>
            <DraggableGroupItem group={group} item={item} />
          </div>
        ))}
      </div>
    </>
  );
}

export default ChosenGroupItems;
