import { Container } from "pixi.js";
export class MiguUI extends Container {
    constructor(parent, size) {
        super();
        this.size = size;
        parent.addChild(this);
    }
}
