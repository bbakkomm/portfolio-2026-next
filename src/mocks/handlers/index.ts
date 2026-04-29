import { projectHandlers } from "./projects";
import { authHandlers } from "./auth";
import { storageHandlers } from "./storage";

export const handlers = [
  ...projectHandlers,
  ...authHandlers,
  ...storageHandlers,
];
