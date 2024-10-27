import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "src/store/StoreConfig";
import RefuseButton from "src/view/components/incoming-call/RefuseButton";

describe("<RefuseButton/>", () => {
  const renderRefuseButton = () => {
    return (
      <Provider store={store}>
        <RefuseButton />
      </Provider>
    );
  };

  test("should render a button", () => {
    render(renderRefuseButton());

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });
});
