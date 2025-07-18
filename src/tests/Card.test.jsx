import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Card from "../components/Card";

describe("Card", () => {
  const geo = { currencySymbol: "$" };

  it("renders home variant product details correctly", () => {
    const item = {
      id: 1,
      title: "Home Product",
      image: "https://example.com/image.jpg",
      price: 15,
    };

    render(<Card item={item} variant="home" geo={geo} />);

    expect(screen.getByText("Home Product")).toBeInTheDocument();
    expect(screen.getByText("$15.00")).toBeInTheDocument();

    // Should NOT render Add to Cart or quantity controls in home variant
    expect(screen.queryByRole("button", { name: "Add to Cart" })).not.toBeInTheDocument();
  });

  it("renders shop variant with quantity controls and adds to cart", () => {
    const item = {
      id: 2,
      title: "Shop Product",
      image: "https://example.com/image2.jpg",
      price: 20,
    };

    const onAdd = vi.fn();
    render(<Card item={item} variant="shop" geo={geo} onAdd={onAdd} />);

    expect(screen.getByText("Shop Product")).toBeInTheDocument();
    expect(screen.getByText("$20.00")).toBeInTheDocument();

    const incrementBtn = screen.getByRole("button", { name: "+" });
    const decrementBtn = screen.getByRole("button", { name: "-" });
    const addBtn = screen.getByRole("button", { name: "Add to Cart" });
    const qtyInput = screen.getByRole("spinbutton");

    expect(incrementBtn).toBeInTheDocument();
    expect(decrementBtn).toBeInTheDocument();
    expect(addBtn).toBeInTheDocument();
    expect(qtyInput).toHaveValue(1);

    // Test increment
    fireEvent.click(incrementBtn);
    expect(qtyInput).toHaveValue(2);

    // Test decrement
    fireEvent.click(decrementBtn);
    expect(qtyInput).toHaveValue(1);

    // Test Add to Cart triggers onAdd with correct quantity
    fireEvent.click(addBtn);
    expect(onAdd).toHaveBeenCalledWith(item, 1);
  });

  it("renders cart variant with qty, total, and remove button", () => {
    const item = {
      id: 3,
      title: "Cart Product",
      image: "https://example.com/image3.jpg",
      price: 10,
      qty: 3,
    };

    const onRemove = vi.fn();

    render(<Card item={item} variant="cart" geo={geo} onRemove={onRemove} />);

    expect(screen.getByText("Qty: 3")).toBeInTheDocument();
    expect(screen.getByText("Total: $30.00")).toBeInTheDocument();

    const removeBtn = screen.getByRole("button", { name: "Remove" });
    fireEvent.click(removeBtn);
    expect(onRemove).toHaveBeenCalledWith(3);
  });
});

