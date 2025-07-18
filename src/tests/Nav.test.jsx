import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Nav from "../components/Nav";
import { BrowserRouter } from "react-router-dom";

describe("Nav component", () => {
  it("renders links, cart emoji and count", () => {
    const cart = [{ id: 1 }, { id: 2 }]; // example cart with 2 items

    render(
      <BrowserRouter>
        <Nav cart={cart} />
      </BrowserRouter>,
    );

    expect(screen.getByText("ShopZ")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Home" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Shop" })).toBeInTheDocument();
    expect(screen.getByText("🛒")).toBeInTheDocument();

    expect(screen.getByText("2")).toBeInTheDocument(); // cart count
  });
});

