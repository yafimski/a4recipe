import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

interface IngredientProp {
  groupName: string;
  itemName: string;
  allowRemove: boolean;
  onRemove?: () => void;
  size?: "sm" | "lg";
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
        size === "lg" ? "large-image" : "small-image"
      } card-shadow center`}
    >
      <img
        draggable={false}
        src={`../src/assets/ingredients/${itemName.toLowerCase()}.webp`}
        alt={itemName}
        data-testid={`${groupName}_${itemName}_selected`}
        className="rounded-2xl"
      />
      {allowRemove && (
        <>
          <div className="flex center rounded-2xl">
            <FontAwesomeIcon
              icon={faClose}
              size="sm"
              onClick={() => onRemove?.()}
              className="absolute top-0 right-0 -m-2 cursor-pointer text-white bg-black bg-opacity-80 rounded-full px-1 py-1"
            />
          </div>
        </>
      )}
    </div>
  );
}

export default IngredientImage;
