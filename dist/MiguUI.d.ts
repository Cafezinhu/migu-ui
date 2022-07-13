import { Container } from "pixi.js";
declare type Size = {
    width: number;
    height: number;
};
export declare class MiguUI extends Container {
    size: Size;
    constructor(parent: Container, size: Size);
}
export {};
