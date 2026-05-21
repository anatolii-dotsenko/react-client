import "reflect-metadata";
import { Container } from "inversify";
import { ApiService } from "./services/ApiService";
import { IApiService } from "./services/IApiService";

const container = new Container();

container.bind<IApiService>(IApiService).to(ApiService).inSingletonScope();

export { container };
