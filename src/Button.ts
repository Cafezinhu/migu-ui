import { UIElement, UIElementOptions } from "./UIElement";

export type ButtonOptions = UIElementOptions & {
    onClick?: () => void;
}

export class Button extends UIElement {
    options: ButtonOptions;
    constructor(options?: ButtonOptions){
        super(options);
        this.interactive = true;
        this.on('click', () => this.options.onClick());
    }
}