import IngredientImage from "../IngredientImage";
import {
  type IngredientItem,
  type ItemsGroup,
  removeItemFromIngredientGroup,
} from "../../state/ingredientGroups/ingredientGroupsSlice";
import { useDispatch } from "react-redux";

interface DraggableGroupItemProps {
  group: ItemsGroup;
  item: IngredientItem;
}

function DraggableGroupItem({ group, item }: DraggableGroupItemProps) {
  const dispatch = useDispatch();
  const handleRemoveItemFromIngredients = (groupName: string, itemName: string) => {
    dispatch(removeItemFromIngredientGroup({ groupName, itemName }));
  };

  return (
    <div>
      <div className="mx-2 hover:cursor-grabbing hover:scale-105">
        <IngredientImage
          groupName={group.groupName}
          item={item}
          allowRemove={true}
          onRemove={() => handleRemoveItemFromIngredients(group.groupName, item.itemName)}
        />
      </div>
    </div>
  );
}

export default DraggableGroupItem;
