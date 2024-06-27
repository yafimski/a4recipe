import { it, expect, describe, beforeEach, afterEach } from "vitest";
import "@testing-library/jest-dom/vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import createMockStore from "../../test-utils/mockStore";
import Header from "../../components/Header";

describe("Header", () => {
  let store: ReturnType<typeof createMockStore>;

  beforeEach(() => {
    store = createMockStore();
    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );
  });

  afterEach(() => {
    cleanup();
  });

  it("should render title and subtitle", () => {
    const title = screen.getByRole("heading", { level: 1, name: /welcome/i });
    const subtitle = screen.getByRole("heading", {
      level: 3,
      name: /name your recipe/i,
    });

    expect(title).toBeInTheDocument();
    expect(subtitle).toBeInTheDocument();
  });

  it("should render inputs", () => {
    const nameInput = screen.getByDisplayValue(store.getState().recipe.title);
    const searchInput = screen.getByDisplayValue(store.getState().recipe.currentItem);
    const groupInput = screen.getByDisplayValue(store.getState().recipe.currentGroupName);

    expect(nameInput).toBeInTheDocument();
    expect(searchInput).toBeInTheDocument();
    expect(groupInput).toBeInTheDocument();
  });

  it("should render add button", () => {
    const addButton = screen.getByRole("button", { name: /add/i });

    const resetButton = screen.getByRole("button", { name: /reset/i });

    expect(addButton).toBeInTheDocument();
    expect(resetButton).toBeInTheDocument();
  });
});
