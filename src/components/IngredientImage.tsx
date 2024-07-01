import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus } from "@fortawesome/free-solid-svg-icons";

interface IngredientProp {
  groupName: string;
  itemName: string;
  allowRemove: boolean;
  onRemove?: () => void;
  size?: string;
}

function IngredientImage({
  groupName,
  itemName,
  allowRemove,
  onRemove,
  size = "lg",
}: IngredientProp) {
  return (
    <div
      key={itemName}
      className={`relative rounded-2xl aspect-square ${
        size === "lg" ? "h-24" : "h-14"
      } card-shadow center`}
    >
      <img
        src={`../src/assets/ingredients/${itemName.toLowerCase()}.webp`}
        alt={itemName}
        data-testid={`${groupName}_${itemName}_selected`}
        className="rounded-2xl"
      />
      {allowRemove && (
        <div className="absolute inset-0 flex center bg-white bg-opacity-70 opacity-0 hover:opacity-100 transition-opacity rounded-2xl">
          <FontAwesomeIcon
            icon={faMinus}
            onClick={() => onRemove?.()}
            className="absolute cursor-pointer text-4xl text-red-500"
          />
        </div>
      )}
    </div>
  );
}

export default IngredientImage;
