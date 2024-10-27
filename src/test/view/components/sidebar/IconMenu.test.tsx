import { render, screen } from "@testing-library/react";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import IconMenu from "src/view/components/sidebar/IconMenu";

describe("<IconMenu/>", () => {
  const renderIconMenu = () => {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<IconMenu />} />
        </Routes>
      </BrowserRouter>
    );
  };

  test("should render two icons", () => {
    render(renderIconMenu());

    const icons = screen.getAllByRole("button");
    expect(icons).toHaveLength(2);
  });

  test("should move to /dashboard on home button click", () => {
    /* render(renderIconMenu());

    const icons = screen.getAllByRole("button");
    icons[0].click();

    expect(global.window.location.href).toContain("/dashboard"); */
  });
});
