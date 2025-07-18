import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Home from "../pages/Home";
import { useOutletContext } from "react-router-dom";

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useOutletContext: vi.fn(),
    Link: ({ to, children, ...rest }) => <a href={to} {...rest}>{children}</a>,
  };
});

describe("Home", () => {
  it("renders hero and about sections", () => {
    useOutletContext.mockReturnValue([
      [], // cart
      vi.fn(),
      [], // products
      vi.fn(),
      { currencySymbol: "$" },
    ]);

    render(<Home />);

    expect(screen.getByText("Welcome to ShopZ 🛍️")).toBeInTheDocument();
    expect(screen.getByText(/Your one-stop shop/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /shop now/i })).toHaveAttribute("href", "/shop");
    expect(screen.getByText("About Us")).toBeInTheDocument();
    expect(screen.getByText(/student-built e-commerce/i)).toBeInTheDocument();
  });

  it("renders top 4 featured products", () => {
    const fakeProducts = Array.from({ length: 6 }, (_, i) => ({
      id: i + 1,
      title: `Product ${i + 1}`,
      price: (i + 1) * 10,
      image: `img${i + 1}.jpg`,
    }));

    useOutletContext.mockReturnValue([
      [], // cart
      vi.fn(),
      fakeProducts,
      vi.fn(),
      { currencySymbol: "$" },
    ]);

    render(<Home />);

    for (let i = 1; i <= 4; i++) {
      expect(screen.getByText(`Product ${i}`)).toBeInTheDocument();
    }

    expect(screen.queryByText("Product 5")).not.toBeInTheDocument();
    expect(screen.queryByText("Product 6")).not.toBeInTheDocument();
  });
});

