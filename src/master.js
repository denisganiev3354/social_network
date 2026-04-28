import { createRoot } from "react-dom/client";
import { createElement } from "react";
let rootElement = document.getElementById("root");
let rootComponent = createRoot(rootElement);
rootComponent.render(
    createElement("h1")
)