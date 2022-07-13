import { Graphics } from "pixi.js";
export class UIElement extends Graphics {
    constructor(options) {
        super();
        this.options = options;
        this.draw();
    }
    setContent(content) {
        var _a;
        (_a = this.content) === null || _a === void 0 ? void 0 : _a.destroy();
        this.content = content;
        this.addChild(content);
        this.draw();
    }
    draw() {
        if (!this.options)
            return;
        let offset = 0;
        const padding = this.options.padding;
        let width = this.options.width ? this.options.width : 0;
        let height = this.options.height ? this.options.height : 0;
        let topPadding = 0;
        let leftPadding = 0;
        if (padding) {
            if (typeof padding == 'number') {
                height = height + padding * 2;
                width = width + padding * 2;
                topPadding = padding;
                leftPadding = padding;
            }
            else {
                if (typeof padding.horizontal == 'number') {
                    width += padding.horizontal * 2;
                    leftPadding = padding.horizontal;
                }
                else {
                    width += padding.horizontal.left + padding.horizontal.right;
                    leftPadding = padding.horizontal.left;
                }
                if (typeof padding.vertical == 'number') {
                    height += padding.vertical * 2;
                    topPadding = padding.vertical;
                }
                else {
                    height += padding.vertical.top + padding.vertical.bottom;
                    topPadding = padding.vertical.top;
                }
            }
        }
        this.alpha = this.options.alpha ? this.options.alpha : 1;
        const radius = this.options.radius;
        const border = this.options.border;
        if (this.content) {
            const contentBounds = this.content.getLocalBounds();
            width += contentBounds.width;
            height += contentBounds.height;
            const borderThickness = (border ? border.thickness : 0);
            this.content.x = borderThickness + leftPadding;
            this.content.y = borderThickness + topPadding;
        }
        if (border) {
            offset = border.thickness;
            this.beginFill(border.color);
            this.drawRoundedRect(0, 0, width + offset * 2, height + offset * 2, radius ? radius + border.thickness : 0);
            this.endFill();
        }
        this.beginFill(this.options.color);
        this.drawRoundedRect(offset, offset, width, height, radius ? radius : 0);
        this.endFill();
    }
}
