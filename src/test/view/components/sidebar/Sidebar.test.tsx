import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ActionTypes } from "src/store/call-states/actions";
import { store } from "src/store/StoreConfig";
import Sidebar from "src/view/components/sidebar/Sidebar";

describe("<Sidebar/>", () => {
  const renderSideBar = () => {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<Sidebar />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    );
  };

  test("should return socomec logo", () => {
    render(renderSideBar());

    const img = screen.getByAltText("logo di socomec");
    expect(img).toBeInTheDocument();
  });

  test("should return call connection details and client info on call accepted", () => {
    render(renderSideBar());

    store.dispatch({type: ActionTypes.CALL_ACCEPTED})

    const clientHeader = screen.getByText("Client");
    expect(clientHeader).toBeInTheDocument();
  });
});
