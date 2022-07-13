import { DisplayObject, Graphics } from "pixi.js";
export declare type UIElementOptions = {
    color: number;
    alpha?: number;
    height?: number;
    width?: number;
    radius?: number;
    border?: Border;
    padding?: {
        vertical: {
            top: number;
            bottom: number;
        } | number;
        horizontal: {
            left: number;
            right: number;
        } | number;
    } | number;
};
export declare type Border = {
    color: number;
    thickness: number;
};
export declare class UIElement extends Graphics {
    options: UIElementOptions;
    content?: DisplayObject;
    constructor(options?: UIElementOptions);
    setContent(content: DisplayObject): void;
    draw(): void;
}
