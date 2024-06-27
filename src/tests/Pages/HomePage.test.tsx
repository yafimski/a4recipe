import { act } from "react";

import "@testing-library/jest-dom/vitest";
import { it, expect, describe, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Provider } from "react-redux";
import createMockStore from "../../test-utils/mockStore";
import routesConfig from "../../test-utils/mockRouter";
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

    const nextPageButton = screen.getByRole("button", { name: /next/i });

    const user = userEvent.setup();
    await user.click(nextPageButton);

    screen.debug();

    expect(screen.getByText(/select the unit for each ingredient/i)).toBeInTheDocument();
  });
});
