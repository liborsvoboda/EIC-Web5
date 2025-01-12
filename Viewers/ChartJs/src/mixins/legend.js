import {isObject} from "../helpers/is-object"
import {getTextBoxWidth} from "../helpers/get-textbox-width"
import {drawSquare} from "../draw/square"
import {drawText} from "../draw/text"
import {drawBox} from "../draw/box"
import {expandPadding} from "../helpers/expand-padding"
import {expandMargin} from "../helpers/expand-margin"

export const MixinLegend = {
    legend() {
        const o = this.options

        return o.legend.vertical === true
            ? this.legendVertical()
            : this.legendHorizontal()
    },

    legendHorizontal(){
        const o = this.options, padding = expandPadding(o.padding), legend = o.legend
        const ctx = this.ctx
        const items = this.legendItems

        if (!legend || !isObject(legend)) return
        if (!items || !Array.isArray(items) || !items.length) return

        const legendPadding = expandPadding(legend.padding)
        const legendMargin = expandMargin(legend.margin)
        let lh, x, y, magic = 5, box
        let offset = 0

        box = legend.font.size / 2

        lh = legend.font.size * legend.font.lineHeight
        y = padding.top + this.viewHeight + (legend.font.size + legendPadding.top + legendMargin.top)
        x = padding.left + legendPadding.left + legendMargin.left

        for (let i = 0; i < items.length; i++) {
            let [name, _, value] = items[i]
            offset += getTextBoxWidth(ctx,[[legend.showValue ? `${name} - ${value}` : name]], {font: legend.font}) + box * 2 + magic
        }

        offset = (this.viewWidth - offset) / 2

        for (let i = 0; i < items.length; i++) {
            let [name, color, value] = items[i]

            const nameWidth = getTextBoxWidth(ctx,[[legend.showValue ? `${name} - ${value}` : name]], {font: legend.font})

            if (x + nameWidth > this.viewWidth) {
                x = padding.left + legendPadding.left + legendMargin.left
                y += lh
            }

            drawSquare(ctx, [offset + x, y, box], {color, fill: color})
            drawText(
                ctx,
                legend.showValue ? `${name} - ${value}` : name,
                [offset + x + box + magic, y + box / 2],
                {
                    color: legend.font.color,
                    stroke: legend.font.color,
                    font: o.font
                }
            )

            x += box + nameWidth + 20
        }
    },

    legendVertical(){
        const o = this.options, legend = o.legend, font = legend.font ?? o.font
        let lh, x, y, magic = 5, box = font.size / 2
        const ctx = this.ctx
        const items = this.legendItems
        let textBoxWidth, textBoxHeight
        const legendPadding = expandPadding(legend.padding), legendMargin = expandMargin(legend.margin)
        const padding = expandPadding(o.padding)

        if (!legend || !isObject(legend)) return
        if (!items || !Array.isArray(items) || !items.length) return

        lh = font.size * font.lineHeight

        textBoxWidth = getTextBoxWidth(ctx, items, {font}) + legendPadding.left + legendPadding.right + box * 3 + magic
        textBoxHeight = items.length * lh + legendPadding.top + legendPadding.bottom + magic

        if (legend.position === 'top-left') {
            x = legendPadding.left + legendMargin.left
            y = legendPadding.top + legendMargin.top
        } else if (legend.position === 'top-right') {
            x = this.dpiWidth - textBoxWidth - legendMargin.right - padding.right
            y = legendPadding.top + legendMargin.top
        } else if (legend.position === 'bottom-left') {
            x = legendPadding.left + legendMargin.left
            y = this.dpiHeight - textBoxHeight - legendPadding.bottom - legendMargin.bottom
        } else {
            x = this.dpiWidth - textBoxWidth - legendMargin.right - legendPadding.right
            y = this.dpiHeight - textBoxHeight - legendPadding.bottom - legendMargin.bottom
        }

        drawBox(ctx, [x, y, textBoxWidth, textBoxHeight], {
            color: legend.background,
            dash: legend.dash,
            size: legend.border.width,
            borderColor: legend.border.color
        })

        x += box + magic + legendPadding.left
        y += box + magic + legendPadding.top

        for (let i = 0; i < items.length; i++) {
            let [name, color, value] = items[i]

            drawSquare(ctx, [x, y, box], {color, fill: color})
            drawText(ctx, legend.showValue ? `${name} - ${value}` : name, [x + box + magic, y + 1], {color: legend.font.color, stroke: legend.font.color, font: legend.font})

            y += lh
        }
    }
}