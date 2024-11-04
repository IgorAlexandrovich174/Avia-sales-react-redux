import { createRoot } from "react-dom/client";
import App from "./components/App/App.jsx";
import "./components/App/App.module.css";
import { Provider } from "react-redux";
import store from "./store/store.js";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>,
);
