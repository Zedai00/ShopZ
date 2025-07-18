import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Shop from "../pages/Shop";
import { useOutletContext } from "react-router-dom";

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useOutletContext: vi.fn(),
  };
});

vi.mock("../components/Card", () => ({
  default: ({ item, onAdd, geo }) => (
    <div data-testid="card">
      <h3>{item.title}</h3>
      <p>{geo.currencySymbol}{item.price.toFixed(2)}</p>
      <button onClick={() => onAdd(item, 1)}>Add</button>
    </div>
  ),
}));

describe("Shop", () => {
  it("renders products and calls onAdd correctly", () => {
    const mockSetCartItems = vi.fn();
    const products = [
      { id: 1, title: "Item A", price: 100 },
      { id: 2, title: "Item B", price: 200 },
    ];

    useOutletContext.mockReturnValue([
      [], // cartItems
      mockSetCartItems,
      products,
      vi.fn(),
      { currencySymbol: "$" },
    ]);

    render(<Shop />);

    expect(screen.getByText("Item A")).toBeInTheDocument();
    expect(screen.getByText("$100.00")).toBeInTheDocument();
    expect(screen.getByText("Item B")).toBeInTheDocument();

    fireEvent.click(screen.getAllByText("Add")[0]);
    expect(mockSetCartItems).toHaveBeenCalledWith([
      { ...products[0], qty: 1 },
    ]);
  });

  it("increments qty if product is already in cart", () => {
    const products = [{ id: 1, title: "Item A", price: 100 }];
    const cartItems = [{ id: 1, title: "Item A", price: 100, qty: 2 }];
    const mockSetCartItems = vi.fn();

    useOutletContext.mockReturnValue([
      cartItems,
      mockSetCartItems,
      products,
      vi.fn(),
      { currencySymbol: "$" },
    ]);

    render(<Shop />);
    fireEvent.click(screen.getByText("Add"));

    expect(mockSetCartItems).toHaveBeenCalledWith([
      { id: 1, title: "Item A", price: 100, qty: 3 },
    ]);
  });
});

