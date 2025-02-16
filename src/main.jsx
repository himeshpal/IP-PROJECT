import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import GitHubFinder from "./GitHubFinder.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GitHubFinder />
  </StrictMode>
);
