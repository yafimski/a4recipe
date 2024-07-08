import { it, expect, describe, beforeEach, afterEach } from "vitest";
import "@testing-library/jest-dom/vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { act } from "react";

import { Provider } from "react-redux";
import createMockStore from "../../test-utils/mockStore";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import routesConfig from "../../utils/routerConfig";
import { defUnit } from "../../utils/helpers";

describe("UnitSelection", () => {
  let store: ReturnType<typeof createMockStore>;
  let router: ReturnType<typeof createMemoryRouter>;

  beforeEach(async () => {
    store = createMockStore();
    router = createMemoryRouter(routesConfig, { initialEntries: ["/quantities"] });

    const customInitialState = {
      recipe: {
        ...store.getState().recipe,
        currentItem: "",
        currentGroupName: "",
        possibleItems: [],
      },
      groups: {
        ingredientsGroups: [
          {
            groupName: "Mock group name",
            items: [{ itemName: "Mock item 1", amount: 0, unit: defUnit }],
          },
        ],
      },
      actions: { ...store.getState().actions },
      warning: { ...store.getState().warning },
    };

    store = createMockStore(customInitialState);

    await act(async () => {
      render(
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
      );
    });
  });

  afterEach(() => {
    cleanup();
  });

  const updateStateWithSecondItem = async () => {
    cleanup();

    const updatedCustomInitialState = {
      recipe: { ...store.getState().recipe },
      groups: {
        ingredientsGroups: [
          {
            groupName: "Mock group name",
            items: [
              { itemName: "Mock item 1", amount: 0, unit: defUnit },
              { itemName: "Mock item 2", amount: 0, unit: defUnit },
            ],
          },
        ],
      },
      actions: { ...store.getState().actions },
      warning: { ...store.getState().warning },
    };

    const customStore = createMockStore(updatedCustomInitialState);

    await act(async () => {
      render(
        <Provider store={customStore}>
          <RouterProvider router={router} />
        </Provider>
      );
    });
  };

  const checkElementsAmountOnUpdate = async (testId: string) => {
    let elements = screen.getAllByTestId(testId);
    expect(elements).toHaveLength(1);

    await updateStateWithSecondItem();

    elements = screen.getAllByTestId(testId);
    expect(elements).toHaveLength(2);
  };

  it("should render image card for each ingredient", async () => {
    await checkElementsAmountOnUpdate("ingredientFullItem");
  });

  it("should render a units button array for each ingredient", async () => {
    await checkElementsAmountOnUpdate("unitsButtonsArray");
  });
});
