import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import type { ChefAction } from "../state/chefActions/chefActionsSlice";

interface IngredientProp {
  action: ChefAction;
  allowRemove: boolean;
}

function ActionImage({ action, allowRemove }: IngredientProp) {
  // const dispatch = useDispatch();

  // const handleRemoveItemFromChefActions = () => {
  //   dispatch();
  // };

  return (
    <div
      key={action.actionName}
      className="relative rounded-2xl aspect-square h-24 card-shadow center"
    >
      <img
        src={`../src/assets/chefActions/${action.actionName.toLowerCase()}.webp`}
        alt={action.actionName}
        data-testid={`${action.actionName}_action`}
        className="rounded-2xl"
      />
      {allowRemove && (
        <div className="absolute inset-0 flex center bg-white bg-opacity-70 opacity-0 hover:opacity-100 transition-opacity">
          <FontAwesomeIcon
            icon={faMinus}
            // onClick={() => handleRemoveItemFromIngredients()}
            className="absolute cursor-pointer text-4xl text-red-500"
          />
        </div>
      )}
    </div>
  );
}

export default ActionImage;
