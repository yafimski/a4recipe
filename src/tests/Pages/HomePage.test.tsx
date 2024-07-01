import { act } from "react";

import "@testing-library/jest-dom/vitest";
import { it, expect, describe, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Provider } from "react-redux";
import createMockStore from "../../test-utils/mockStore";
import routesConfig from "../../utils/routerConfig";
import { RouterProvider, createMemoryRouter } from "react-router-dom";

describe("HomePage", () => {
  let store: ReturnType<typeof createMockStore>;

  beforeEach(() => {
    store = createMockStore();
  });

  it("should go to /quantities when next button clicked", async () => {
    const router = createMemoryRouter(routesConfig, { initialEntries: ["/"] });

    await act(async () => {
      render(
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
      );
    });

    const nextPageButton = screen.getByTestId("next");

    const user = userEvent.setup();
    await user.click(nextPageButton);

    expect(screen.getByTestId(/quantities/i)).toBeInTheDocument();
  });
});
