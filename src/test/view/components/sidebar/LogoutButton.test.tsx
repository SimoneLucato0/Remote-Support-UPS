import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { store } from "src/store/StoreConfig";
import LogoutButton from "src/view/components/sidebar/LogoutButton";

describe("<LogoutButton/>", () => {
  const renderLogoutButton = () => {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<LogoutButton />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    );
  };

  test("should render a button", () => {
    render(renderLogoutButton());

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });

  test("should move to /login on button click", () => {
    /* render(renderLogoutButton());

    const button = screen.getByRole("button");
    button.click()

    expect(global.window.location.pathname).toContain("/login"); */
  })
});
