import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@fontsource/press-start-2p";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";

// 字体加载检测
document.documentElement.classList.add("font-loading");

Promise.all([
  document.fonts.load('100 10px "Ark Pixel"'),
  document.fonts.load('400 12px "Ark Pixel"'),
  document.fonts.load('700 16px "Ark Pixel"'),
]).then(() => {
  document.documentElement.classList.remove("font-loading");
  document.documentElement.classList.add("font-loaded");
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
