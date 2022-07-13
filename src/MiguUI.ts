import { Container } from "pixi.js";
import { Anchor, anchorToPosition } from "./types/Anchor";
import { UIElement } from "./UIElement";

export class MiguUI extends Container{
    elements: UIElement[];
    canvas: HTMLCanvasElement;

    constructor(parent: Container, canvas: HTMLCanvasElement){
        super();
        parent.addChild(this);
        this.canvas = canvas;
        this.elements = [];
    }

    addElement(element: UIElement, adjustPivot = true){
        const anchor = anchorToPosition(element.options.anchor);
        if(adjustPivot){
            const elementBounds = element.getBounds();
            
            element.pivot = {
                x: anchor.x * elementBounds.width, 
                y: anchor.y * elementBounds.height
            }
        }
        this.repositionElement(element);
        this.addChild(element);
        this.elements.push(element);
    }

    update(){
        this.elements.forEach(element => this.repositionElement(element));
    }

    repositionElement(element: UIElement){
        const anchor = anchorToPosition(element.options.anchor);

        const xPos = (this.canvas.width * anchor.x + element.options.relativePositionToAnchor.x) * this.parent.scale.x;
        const yPos = (this.canvas.height * anchor.y + element.options.relativePositionToAnchor.y) * this.parent.scale.y;

        element.position = {x: xPos, y: yPos};
    }
}