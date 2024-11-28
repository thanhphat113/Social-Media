import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App.jsx";
import GlobalStyles from "./components/GlobalStyles/index.jsx";
import Store from "./components/Redux/Store";
import { Provider } from "react-redux";
import Validate from "./components/Validate/index.jsx";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <Provider store={Store}>
            <Router>
                <GlobalStyles>
                    <App />
                </GlobalStyles>
            </Router>
        </Provider>
    </StrictMode>
);
