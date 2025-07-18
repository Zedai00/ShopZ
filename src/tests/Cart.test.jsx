import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Cart from "../pages/Cart";
import { useOutletContext } from "react-router-dom";

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useOutletContext: vi.fn(),
  };
});

describe("Cart", () => {
  it("shows empty cart message", () => {
    useOutletContext.mockReturnValue([[], vi.fn(), [], vi.fn(), { currencySymbol: "$" }]);
    render(<Cart />);
    expect(screen.getByText("Your cart is empty")).toBeInTheDocument();
    expect(screen.getByText("Start adding items to see them here.")).toBeInTheDocument();
  });

  it("displays cart items and total", () => {
    const cartItems = [
      { id: 1, title: "Apple", price: 20, qty: 2, image: "apple.jpg" },
      { id: 2, title: "Banana", price: 10, qty: 1, image: "banana.jpg" },
    ];
    useOutletContext.mockReturnValue([cartItems, vi.fn(), [], vi.fn(), { currencySymbol: "$" }]);
    render(<Cart />);
    expect(screen.getByText("Apple")).toBeInTheDocument();
    expect(screen.getByText("Banana")).toBeInTheDocument();
    expect(screen.getByText("Total Items: 2")).toBeInTheDocument();
    expect(screen.getByText("Total Amount: $50.00")).toBeInTheDocument();
  });

  it("removes item when remove is clicked", () => {
    const mockSet = vi.fn();
    const cartItems = [{ id: 1, title: "Orange", price: 15, qty: 1, image: "orange.jpg" }];
    useOutletContext.mockReturnValue([cartItems, mockSet, [], vi.fn(), { currencySymbol: "$" }]);
    render(<Cart />);
    fireEvent.click(screen.getByRole("button", { name: /remove/i }));
    expect(mockSet).toHaveBeenCalledWith([]);
  });
});

