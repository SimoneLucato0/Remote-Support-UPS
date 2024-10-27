var mockLogin = jest.fn()
const dispatchLogin = jest.mock("src/store/auth/actions", () => ({
    login: mockLogin
}))

import { applyMiddleware, createStore } from "@reduxjs/toolkit";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { RootReducer } from "src/store/RootReducer";
import RTCMiddleware from "src/store/RTCMiddleware";
import LoginBox from "src/view/components/login/LoginBox";

describe("<LoginBox/>", () => {
  const store = createStore(RootReducer, composeWithDevTools(applyMiddleware(thunk, RTCMiddleware)))

  const renderLoginBox = () => {
    return (
      <Provider store={store}>
        <LoginBox />
      </Provider>
    );
  };

  test("should render socomec logo", () => {
    render(renderLoginBox());

    const logo = screen.getByAltText("logo di Socomec");
    expect(logo).toBeInTheDocument();
  });

  test("should render Smart4Energy", () => {
    render(renderLoginBox());

    const header = screen.getByText("Smart4Energy");
    expect(header).toBeInTheDocument();
  });

  test("should render login form", () => {
    render(renderLoginBox());

    const inputList = document.querySelectorAll("input");
    const emailLabel = screen.getByText("E-mail");
    const emailInput = inputList[0];
    const passwordLabel = screen.getByText("Password");
    const passwordInput = inputList[1];

    expect(emailLabel).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordLabel).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });

  test("should dispatch function on form submit", () => {
    /* render(<Provider store={store}><LoginBox/></Provider>);

    const button = screen.getByRole("button")
    button.click()

    expect(dispatchLogin).toHaveBeenCalled();  */
  });
});
