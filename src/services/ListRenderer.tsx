import { injectable } from "inversify";
import type { IListRenderer } from "./IListRenderer";

@injectable()
export class ListRenderer implements IListRenderer {
  render(items: string[], onItemClick: (item: string) => void) {
    return (
      <ul className="clickable-list">
        {items.map((item, i) => (
          <li key={i} onClick={() => onItemClick(item)}>
            {item}
          </li>
        ))}
      </ul>
    ) as any;
  }
}