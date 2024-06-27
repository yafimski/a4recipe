import { it, expect, describe, beforeEach, afterEach } from "vitest";
import "@testing-library/jest-dom/vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";

import createMockStore from "../../test-utils/mockStore";

import { allPossibleIngredients } from "../../utils/data";
import Header from "../../components/Header";
import SelectionGallery from "../../components/SelectionGallery";
import ChosenIngredientsGallery from "../../components/ChosenIngredientsGallery";

describe("SelectionGallery", () => {
  let store: ReturnType<typeof createMockStore>;

  beforeEach(() => {
    store = createMockStore();

    render(
      <Provider store={store}>
        <Header />
        <SelectionGallery />
        <ChosenIngredientsGallery />
      </Provider>
    );
  });

  afterEach(() => {
    cleanup();
  });

  it("should render Suspense fallbacks and IngredientGalleryItems", async () => {
    // biome-ignore lint/complexity/noForEach: <explanation>
    allPossibleIngredients.forEach((itemName) => {
      const suspenseFallback = screen.getByTestId(`${itemName}_suspense`);

      expect(suspenseFallback).toBeInTheDocument();
    });

    await screen.findAllByTestId(/_gallery/i).then((items) => {
      expect(items.length).toBe(allPossibleIngredients.length);
    });
  });

  it("should render selected item when initial state added", async () => {
    const recipe = store.getState().recipe;
    const addButton = screen.getByRole("button", { name: /add/i });
    const selectedGroup = screen.getByTestId("chosen_group");

    const user = userEvent.setup();
    await user.click(addButton);
    const addedItem = await screen.findByTestId(
      `${recipe.currentGroupName}_${recipe.currentItem}_selected`
    );

    expect(addedItem).toHaveAccessibleName(recipe.currentItem);
    expect(selectedGroup).toHaveTextContent(recipe.currentGroupName);
  });

  it("should render empty selected gallery when reset button clicked", async () => {
    const resetButton = screen.getByRole("button", { name: /reset/i });

    const user = userEvent.setup();
    await user.click(resetButton);
    const updatedGroups = store.getState().groups.ingredientsGroups;

    console.log(updatedGroups);
    expect(updatedGroups.length).toBe(0);
  });

  it("should render empty selected gallery when reset button clicked", async () => {
    const resetButton = screen.getByRole("button", { name: /reset/i });

    const user = userEvent.setup();
    await user.click(resetButton);
    const updatedGroups = store.getState().groups.ingredientsGroups;

    console.log(updatedGroups);
    expect(updatedGroups.length).toBe(0);
  });
});
