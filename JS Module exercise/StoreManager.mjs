import { addItem, removeItem, listItems } from "./inventory.mjs";

addItem ("Item 1");
addItem ("Item 2");
addItem ("Item 3");
addItem ("Item 4");
addItem ("Item 5");
addItem ("Item 6");

removeItem ("Item 2");
removeItem ("Item4");
removeItem ("Item 5");

listItems ();
