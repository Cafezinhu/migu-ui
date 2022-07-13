import { Container } from "pixi.js";

type Size = {
    width: number;
    height: number;
}

export class MiguUI extends Container{
    size: Size;

    constructor(parent: Container, size: Size){
        super();
        this.size = size;
        parent.addChild(this);
    }
}