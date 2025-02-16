import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import RedditFeedViewer from "./RedditFeedViewer.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RedditFeedViewer />
  </StrictMode>
);
