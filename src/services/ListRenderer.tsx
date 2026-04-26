import { injectable } from "inversify";
import type { IListRenderer } from "./IListRenderer";

@injectable()
export class ListRenderer implements IListRenderer {
  render(items: string[]) {
    return (
      <ul>
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    ) as any;
  }
}
