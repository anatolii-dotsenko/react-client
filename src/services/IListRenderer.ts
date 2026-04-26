import type { JSX } from "react";

export interface IListRenderer {
  render(items: string[]): JSX.Element;
}

export const IListRenderer = Symbol("IListRenderer");
