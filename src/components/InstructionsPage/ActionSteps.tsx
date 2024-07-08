import InstructionsItems from "./InstructionsItems";
import InstructionsActions from "./InstructionsActions";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../state/store";
import {
  type ChefInstruction,
  type ChefAction,
  addChefInstruction,
  updateChefInstructionItems,
  updateInstructionAction,
  updateAvailableItem,
} from "../../state/chefActions/chefActionsSlice";
import { useEffect, useRef, useState } from "react";
import { faAnglesLeft, faAnglesRight } from "@fortawesome/free-solid-svg-icons";
import Caret from "./Caret";
import type { IngredientItem } from "../../state/ingredientGroups/ingredientGroupsSlice";
import {
  DndContext,
  type DragEndEvent,
  type DragStartEvent,
  DragOverlay,
  closestCorners,
  pointerWithin,
  type Active,
  type ClientRect,
  type DroppableContainer,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";
import IngredientImage from "../IngredientImage";
import PanelsContainer from "./PanelsContainer";
import ActionImageWithName from "../ActionImageWithName";
import { isEqual } from "lodash";
import type { RectMap } from "@dnd-kit/core/dist/store";
import type { Coordinates } from "@dnd-kit/utilities";

function ActionSteps() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollRef2 = useRef<HTMLDivElement>(null);

  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [startX, setStartX] = useState<number>(0);
  const [scrollAmount, setScrollLeft] = useState<number>(0);
  const [activeAction, setActiveAction] = useState<ChefAction | null>(null);
  const [activeItem, setActiveItem] = useState<IngredientItem | null>(null);

  const [currentRef, setCurrentRef] = useState<React.RefObject<HTMLDivElement> | null>(
    null
  );

  const dispatch = useDispatch();
  const chefInstructions = useSelector(
    (state: RootState) => state.actions.chefInstructions
  );

  useEffect(() => {
    if (currentRef) {
      const scrollable = currentRef.current;

      const handleWheel = (e: WheelEvent) => {
        const scrollAmount = 20;
        if (scrollable) {
          e.preventDefault();

          if (e.deltaY < 0) {
            scrollable.scrollLeft -= scrollAmount;
          } else {
            scrollable.scrollLeft += scrollAmount;
          }
        }
      };

      if (scrollable) {
        scrollable.addEventListener("wheel", handleWheel, { passive: false });
      }

      return () => {
        if (scrollable) {
          scrollable.removeEventListener("wheel", handleWheel);
        }
      };
    }
  }, [currentRef]);

  const scrollByItems = (direction: string) => {
    if (currentRef?.current) {
      const itemWidth = (currentRef.current.firstChild as HTMLElement).offsetWidth;

      const scrollAmount = itemWidth * 4;
      currentRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleMouseDown = (ref: React.RefObject<HTMLDivElement>, e: React.MouseEvent) => {
    if (!ref.current) return;
    setCurrentRef(ref);

    if (ref.current) {
      setIsDragging(true);
      setStartX(e.pageX - ref.current.offsetLeft);
      setScrollLeft(ref.current.scrollLeft);
    }
  };

  const handleMouseMove = (ref: React.RefObject<HTMLDivElement>, e: React.MouseEvent) => {
    if (!isDragging || !ref.current) return;
    setCurrentRef(ref);

    e.preventDefault();
    if (ref.current) {
      const x = e.pageX - ref.current.offsetLeft;
      const walk = x - startX;
      ref.current.scrollLeft = scrollAmount - walk;
    }
  };

  const handleInstructionClick = (inst: ChefInstruction) => {
    const actionsScrollbar = scrollRef.current;
    let targetAction = null;

    targetAction = actionsScrollbar?.querySelector(
      `[data-action-name="${inst.action.actionName}"]`
    );

    if (targetAction) {
      targetAction.scrollIntoView({ behavior: "smooth", inline: "center" });
    }
  };

  const handleAddInstruction = (action: ChefAction) => {
    dispatch(
      addChefInstruction({
        id:
          chefInstructions.length > 0
            ? Math.max(...chefInstructions.map((inst) => inst.id)) + 1
            : 0,
        note: "",
        action,
        items: [],
      })
    );
  };

  const handleDragStart = (e: DragStartEvent) => {
    if (e.active.data.current?.type === "Action") {
      setActiveAction(e.active.data.current?.action);
    } else {
      setActiveAction(null);
    }

    if (e.active.data.current?.type === "Ingredient") {
      setActiveItem(e.active.data.current?.item);
    } else {
      setActiveItem(null);
    }
  };

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    if (!over) return;

    const activeType = active.data.current?.type;
    const overType = over.data.current?.type;

    if (activeType === "Action" && overType === "Steps") {
      handleAddInstruction(active.data.current?.action);
    } else if (overType === "Instruction") {
      const instruction = over.data.current?.instruction as ChefInstruction;

      if (activeType === "Action") {
        const action = active.data.current?.action as ChefAction;
        dispatch(updateInstructionAction({ id: instruction.id, action }));
      } else if (activeType === "Ingredient") {
        const item = active.data.current?.item as IngredientItem;
        const itemExists = instruction.items.find((currItem) => isEqual(currItem, item));
        if (!itemExists) {
          dispatch(
            updateChefInstructionItems({
              id: instruction.id,
              items: [...instruction.items, item],
            })
          );

          dispatch(updateAvailableItem(item));
        }
      }
    }
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

          return aArea - bArea;
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
        distance: 0,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );

  return (
    <DndContext
      collisionDetection={customCollisionDetectionAlgorithm}
      modifiers={[restrictToWindowEdges]}
      sensors={sensors}
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
    >
      <div className="mt-16 max-h-5/6 w-11/12 input-gallery-border p-4">
        <h2 className="text-fluidSubtitle mb-2">
          Plan the instructions and steps for this recipe!
        </h2>
        <div className="flex flex-row gap-2">
          <Caret icon={faAnglesLeft} onCaretClick={() => scrollByItems("left")} />
          <div
            id="actions-scrollbar"
            className="flex w-full overflow-x-scroll py-4 pt-4 overflow-y-auto"
            ref={scrollRef}
            onMouseDown={(e) => handleMouseDown(scrollRef, e)}
            onMouseLeave={() => setIsDragging(false)}
            onMouseUp={() => setIsDragging(false)}
            onMouseMove={(e) => handleMouseMove(scrollRef, e)}
          >
            <InstructionsActions />
          </div>
          <Caret icon={faAnglesRight} onCaretClick={() => scrollByItems("right")} />
          {activeAction && (
            <DragOverlay>
              <ActionImageWithName action={activeAction} />
            </DragOverlay>
          )}
        </div>
        <div className="flex w-full justify-between mt-8">
          <div
            ref={scrollRef2}
            className="flex flex-col min-w-fit sm:p-2 md:p-4 sm:mr-4 md:mr-2 max-h-half overflow-y-scroll scroll-normal"
          >
            <div className="scroll-mirror">
              <InstructionsItems />
            </div>
          </div>
          {activeItem && (
            <DragOverlay>
              <IngredientImage
                groupName={Math.random().toString()}
                item={activeItem}
                allowRemove={false}
              />
            </DragOverlay>
          )}
          <PanelsContainer
            onInstructionClick={(inst: ChefInstruction) => handleInstructionClick(inst)}
          />
        </div>
      </div>
    </DndContext>
  );
}

export default ActionSteps;
