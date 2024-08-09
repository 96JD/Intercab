import "react-toastify/dist/ReactToastify.css";
import "./App.css";

import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import { reduxStore } from "./reduxToolkit/store";

const root = document.getElementById("root");

if (root) {
	ReactDOM.createRoot(root).render(
		<Provider store={reduxStore}>
			<HelmetProvider>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</HelmetProvider>
		</Provider>
	);
}
