import { act } from "react";

import "@testing-library/jest-dom/vitest";
import { it, expect, describe, beforeEach, afterEach } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Provider } from "react-redux";
import createMockStore from "../../test-utils/mockStore";
import routesConfig from "../../utils/routerConfig";
import { RouterProvider, createMemoryRouter } from "react-router-dom";

describe("Quantities", () => {
  let store: ReturnType<typeof createMockStore>;
  let router: ReturnType<typeof createMemoryRouter>;

  beforeEach(async () => {
    store = createMockStore();

    router = createMemoryRouter(routesConfig, { initialEntries: ["/quantities"] });
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

  it("should go to /instructions when next button clicked", async () => {
    const nextPageButton = screen.getByTestId("next");
    const user = userEvent.setup();
    await user.click(nextPageButton);

    expect(screen.getByTestId("instructions")).toBeInTheDocument();
  });

  it("should go to / when back button clicked", async () => {
    const backPageButton = screen.getByTestId("back");
    const user = userEvent.setup();
    await user.click(backPageButton);

    expect(screen.getByTestId("homepage")).toBeInTheDocument();
  });

  it("should show toast when next button clicked if not all quantities and units are filled", async () => {
    cleanup();

    const updatedCustomInitialState = {
      recipe: { ...store.getState().recipe },
      groups: {
        ingredientsGroups: [
          {
            groupName: "Mock group",
            items: [{ itemName: "Mock item", amount: 0, unit: "None" }],
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

    const nextPageButton = screen.getByTestId("next");
    const user = userEvent.setup();
    await user.click(nextPageButton);

    expect(screen.getByTestId("snack")).toBeInTheDocument();
    expect(screen.getByTestId("quantities")).toBeInTheDocument();
  });
});
