import {
  type DragEndEvent,
  useSensors,
  useSensor,
  MouseSensor,
  TouchSensor,
  DndContext,
  type DragStartEvent,
  DragOverlay,
  type Active,
  type DroppableContainer,
  closestCorners,
  pointerWithin,
  type ClientRect,
} from "@dnd-kit/core";
import { restrictToFirstScrollableAncestor } from "@dnd-kit/modifiers";
import {
  type IngredientItem,
  removeItemFromIngredientGroup,
  addItemToIngredientGroup,
} from "../../state/ingredientGroups/ingredientGroupsSlice";
import ChosenGroups from "./ChosenGroups";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../state/store";
import { useState } from "react";
import IngredientImage from "../IngredientImage";
import type { RectMap } from "@dnd-kit/core/dist/store";
import type { Coordinates } from "@dnd-kit/utilities";

function ChosenIngredientsGallery() {
  const dispatch = useDispatch();
  const ingredientsGroups = useSelector(
    (state: RootState) => state.groups.ingredientsGroups
  );
  const [activeItem, setActiveItem] = useState<IngredientItem | null>(null);

  const handleDragStart = (e: DragStartEvent) => {
    setActiveItem(e.active.data.current?.item);
  };

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    if (!over) return;

    const isActiveAnItem = active.data.current?.type === "Ingredient";
    const isOverAGroup = over.data.current?.type === "Group";

    const parent = active.data.current?.parentGroup;

    if (isActiveAnItem && isOverAGroup && parent !== (over.id as string)) {
      const itemName = (active.id as string).split("_")[1];
      const doesItemExistInDroppable = ingredientsGroups
        .filter((group) => group.groupName === (over.id as string))[0]
        .items.findIndex((item: IngredientItem) => item.itemName === itemName);

      if (doesItemExistInDroppable > -1) return;

      dispatch(
        removeItemFromIngredientGroup({
          groupName: parent,
          itemName,
        })
      );

      dispatch(
        addItemToIngredientGroup({
          groupName: over.id as string,
          itemName,
          item: active.data.current?.item,
        })
      );
    }

    setActiveItem(null);
  };

  const customCollisionDetectionAlgorithm = (args: {
    active: Active;
    collisionRect: ClientRect;
    droppableRects: RectMap;
    droppableContainers: DroppableContainer[];
    pointerCoordinates: Coordinates | null;
  }) => {
    const collisions = pointerWithin(args);
    if (collisions.length > 0) {
      const sortedCollisions = collisions.sort((a, b) => {
        const aRect = args.droppableRects.get(a.id);
        const bRect = args.droppableRects.get(b.id);

        if (aRect && bRect) {
          const aArea = aRect.width * aRect.height;
          const bArea = bRect.width * bRect.height;

          return bArea - aArea;
        }

        return 0;
      });

      return sortedCollisions;
    }

    return closestCorners(args);
  };

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        distance: 4,
      },
    })
  );

  return (
    <DndContext
      collisionDetection={customCollisionDetectionAlgorithm}
      modifiers={[restrictToFirstScrollableAncestor]}
      sensors={sensors}
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
    >
      <div className="relative px-4 pb-4 overflow-auto center text-center no-scrollbar overflow-x-hidden">
        <h2 className="mb-8 text-fluidSubtitle">Selected ingredient groups</h2>
        <ChosenGroups />
      </div>
      {activeItem && (
        <DragOverlay>
          <IngredientImage
            groupName={`${activeItem.itemName}_${Math.random().toString()}`}
            item={activeItem}
            allowRemove={false}
          />
        </DragOverlay>
      )}
    </DndContext>
  );
}

export default ChosenIngredientsGallery;
