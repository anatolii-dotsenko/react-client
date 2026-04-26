import "reflect-metadata";
import { Container } from "inversify";
import { ApiService } from "./services/ApiService";
import { ListRenderer } from "./services/ListRenderer";
import { IApiService } from "./services/IApiService";
import { IListRenderer } from "./services/IListRenderer";

const container = new Container();
container.bind<IApiService>(IApiService).to(ApiService).inSingletonScope();
container.bind<IListRenderer>(IListRenderer).to(ListRenderer).inSingletonScope();

export { container };
