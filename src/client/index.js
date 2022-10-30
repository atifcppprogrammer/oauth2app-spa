import { createRoot } from "react-dom/client";
import App from "./components/App";
import * as React from "react";
import "./global-styles.css";

const container = document.querySelector("div#app-root");
const root = createRoot(container);
root.render(<App />);
