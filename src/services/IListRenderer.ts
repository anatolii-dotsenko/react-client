import type { JSX } from "react";

export interface IListRenderer {
  render(items: string[], onItemClick: (item: string) => void): JSX.Element;
}
export const IListRenderer = Symbol("IListRenderer");