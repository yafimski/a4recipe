import { act } from "react";

import "@testing-library/jest-dom/vitest";
import { it, expect, describe, beforeEach, afterEach } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Provider } from "react-redux";
import createMockStore from "../../test-utils/mockStore";
import routesConfig from "../../test-utils/mockRouter";
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
});
