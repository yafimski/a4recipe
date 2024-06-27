import { it, expect, describe, beforeEach, afterEach } from "vitest";
import "@testing-library/jest-dom/vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";

import createMockStore from "../../test-utils/mockStore";

import Header from "../../components/Header";
import userEvent from "@testing-library/user-event";
import type { RootState } from "../../state/store";

describe("WarningSnack", () => {
  let store: ReturnType<typeof createMockStore>;

  beforeEach(() => {
    store = createMockStore();
  });

  afterEach(() => {
    cleanup();
  });

  const setupTest = async (customInitialState: RootState | undefined) => {
    const customStore = createMockStore(customInitialState);
    render(
      <Provider store={customStore}>
        <Header />
      </Provider>
    );

    const addButton = screen.getByRole("button", { name: /add/i });
    const user = userEvent.setup();
    await user.click(addButton);

    const snack = await screen.findByTestId("snack");
    return snack;
  };

  it("should render warning snack on add button click with incorrect group condition", async () => {
    const customInitialState = {
      recipe: {
        ...store.getState().recipe,
        currentItem: "",
        currentGroupName: "",
        possibleItems: [],
      },
      groups: {
        ingredientsGroups: [],
      },
      warning: { ...store.getState().warning },
    };

    const snack = await setupTest(customInitialState);
    expect(snack).toHaveTextContent(/group name/i);
  });

  it("should render warning snack on add button click with incorrect search ingredient condition", async () => {
    const customInitialState = {
      recipe: {
        ...store.getState().recipe,
        currentItem: "",
        currentGroupName: "Mock group name",
        possibleItems: [],
      },
      groups: {
        ingredientsGroups: [],
      },
      warning: { ...store.getState().warning },
    };

    const snack = await setupTest(customInitialState);
    expect(snack).toHaveTextContent(/search an ingredient/i);
  });

  it("should render warning snack on add button click with too many possible items condition", async () => {
    const customInitialState = {
      recipe: {
        ...store.getState().recipe,
        currentItem: "Mock item 1",
        currentGroupName: "Mock group name",
        possibleItems: ["Mock item 1", "Mock item 2"],
      },
      groups: {
        ingredientsGroups: [],
      },
      warning: { ...store.getState().warning },
    };

    const snack = await setupTest(customInitialState);
    expect(snack).toHaveTextContent(/too many ingredients/i);
  });

  it("should render warning snack on add button click with empty possible items gallery condition", async () => {
    const customInitialState = {
      recipe: {
        ...store.getState().recipe,
        currentItem: "Mock item 1",
        currentGroupName: "Mock group name",
        possibleItems: [],
      },
      groups: {
        ingredientsGroups: [],
      },
      warning: { ...store.getState().warning },
    };

    const snack = await setupTest(customInitialState);
    expect(snack).toHaveTextContent(/no items/i);
  });
});
