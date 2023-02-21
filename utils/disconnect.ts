import { close } from "./dbConnection";

afterAll(async() => await close())