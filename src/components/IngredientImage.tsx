import { useDispatch } from "react-redux";
import { removeItemFromIngredientGroup } from "../state/ingredientGroups/ingredientGroupsSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus } from "@fortawesome/free-solid-svg-icons";

interface IngredientProp {
  groupName: string;
  itemName: string;
}

function IngredientImage({ groupName, itemName }: IngredientProp) {
  const dispatch = useDispatch();

  const handleRemoveItemFromIngredients = () => {
    dispatch(removeItemFromIngredientGroup({ groupName: groupName, itemName }));
  };

  return (
    <div
      key={itemName}
      className="relative rounded-2xl aspect-square h-24  card-shadow center mx-2"
    >
      <img
        src={`../src/assets/${itemName.toLowerCase()}.webp`}
        alt={itemName}
        className="rounded-2xl"
      />
      <div className="absolute inset-0 flex center bg-white bg-opacity-70 opacity-0 hover:opacity-100 transition-opacity">
        <FontAwesomeIcon
          icon={faMinus}
          onClick={() => handleRemoveItemFromIngredients()}
          className="absolute cursor-pointer text-4xl text-red-500"
        />
      </div>
    </div>
  );
}

export default IngredientImage;
