import {Chart} from "../base"
import {minMax} from "../../helpers/min-max"
import {drawCircle} from "../../draw/circle"
import {drawLine} from "../../draw/line"
import {drawSquare} from "../../draw/square"
import {drawTriangle} from "../../draw/triangle"
import {drawDiamond} from "../../draw/diamond"
import {defaultLineChartOptions} from "../../defaults/line"
import {merge} from "../../helpers/merge"
import {expandPadding} from "../../helpers/expand-padding";

import {MixinCross} from "../../mixins/cross"
import {MixinAxis} from "../../mixins/axis"
import {MixinAddPoint} from "../../mixins/add-point";
import {drawCurve} from "../../draw/curve";
import {mergeProps} from "../../helpers/merge-props";
import {MixinArrows} from "../../mixins/arrows";
import {isObject} from "../../helpers/is-object";

const DEFAULT_LINE_TYPE = 'line'
const DEFAULT_DOT_TYPE = 'circle'
const DOT_TRIANGLE = 'triangle'
const DOT_SQUARE = 'square'
const DOT_DIAMOND = 'diamond'
const VALUE_DEFAULT = 'default'

export class LineChart extends Chart {
    constructor(el, data = [], options = {}) {
        super(el, data, merge({}, defaultLineChartOptions, options), 'line')

        this.coords = {}
        this.minX = 0
        this.maxX = 0
        this.minY = 0
        this.maxY = 0

        this.legendItems = []
        const legend = this.options.legend
        const lines = this.options.lines
        const colors = this.options.colors
        if (legend) {
            for (let i = 0; i < lines.length; i++) {
                this.legendItems.push([lines[i].name, colors[i]])
            }
        }

        this.calcMinMax()
        this.resize()
    }

    calcMinMax(){
        const o = this.options
        let a = []

        for (let _data of this.data) {
            if (!Array.isArray(_data)) continue

            for( const [x, y] of _data) {
                a.push([x, y])
            }
        }

        const [minX, maxX] = minMax(a, 'x');
        const [minY, maxY] = minMax(a, 'y');

        this.minX = o.boundaries && !isNaN(o.boundaries.minX) ? o.boundaries.minX : minX
        this.maxX = o.boundaries && !isNaN(o.boundaries.maxX) ? o.boundaries.maxX : maxX
        this.minY = o.boundaries && !isNaN(o.boundaries.minY) ? o.boundaries.minY : minY
        this.maxY = o.boundaries && !isNaN(o.boundaries.maxY) ? o.boundaries.maxY : maxY

        if (isNaN(this.minX)) this.minX = 0
        if (isNaN(this.maxX)) this.maxX = 100
        if (isNaN(this.minY)) this.minX = 0
        if (isNaN(this.maxY)) this.maxX = 100
    }

    calcRatio(){
        this.ratioX = this.viewWidth / (this.maxX === this.minX ? this.maxX : this.maxX - this.minX)
        this.ratioY = this.viewHeight / (this.maxY === this.minY ? this.maxY : this.maxY - this.minY)
    }

    lines(){
        const o = this.options, padding = expandPadding(o.padding)
        const ctx = this.ctx
        let coords

        if (!this.data || !this.data.length) return

        for (let i = 0; i < this.data.length; i++) {
            const line = o.lines[i]
            const data = this.data[i]
            const color = o.colors[i]
            const type = line.type || o.type || DEFAULT_LINE_TYPE

            coords = []

            for (const [x, y] of data) {
                let _x = Math.floor((x - this.minX) * this.ratioX + padding.left)
                let _y = Math.floor(this.viewHeight + padding.top - (y - this.minY) * this.ratioY)

                coords.push([_x, _y, x, y])
            }

            if (line.showLine !== false) {
                if (type !== DEFAULT_LINE_TYPE) {
                    drawCurve(ctx, coords, {color: color, size: line.size})
                } else {
                    drawLine(ctx, coords, {color: color, size: line.size})
                }
            }

            let dots = mergeProps({
                type: DEFAULT_DOT_TYPE,
            }, o.dots, line.dots)

            let opt = {
                color: dots.color ?? color,
                fill: dots.fill ?? color,
                radius: dots.size ?? 2
            }

            let drawPointFn

            switch (dots.type) {
                case DOT_SQUARE:
                    drawPointFn = drawSquare
                    break
                case DOT_TRIANGLE:
                    drawPointFn = drawTriangle
                    break
                case DOT_DIAMOND:
                    drawPointFn = drawDiamond
                    break
                default: drawPointFn = drawCircle
            }

            if (line.dots && o.showDots !== false) {
                coords.map(([x, y]) => {
                    drawPointFn(ctx, [x, y, opt.radius], opt)
                })
            }

            this.coords[line.name] = {
                line,
                coords,
                drawPointFn,
                opt
            }
        }
    }

    floatPoint(){
        const o = this.options
        const ctx = this.ctx
        const rect = this.canvas.getBoundingClientRect()
        let tooltip = false

        if (!this.data || !this.data.length) return
        if (!this.proxy.mouse) return

        let {x, y} = this.proxy.mouse

        const mx = x - rect.left
        const my = y - rect.top

        for (const name in this.coords) {
            const item = this.coords[name]
            const drawPointFn = item.drawPointFn
            const opt = item.opt
            // const graph = item.graph

            for (const [px, py, _x, _y] of item.coords) {
                const accuracy = +(o.accuracy || opt.radius)
                const lx = px - accuracy, rx = px + accuracy
                const ly = py - accuracy, ry = py + accuracy

                if ((mx > lx && mx < rx) && (o.hoverMode !== VALUE_DEFAULT)) {
                    drawPointFn(ctx, [px, py, opt.radius], {color: opt.color, fill: opt.fill})
                }

                if ((mx > lx && mx < rx) && (my > ly && my < ry)) {
                    if (o.hoverMode === VALUE_DEFAULT) drawPointFn(ctx, [px, py, opt.radius * 2], {color: opt.color, fill: opt.fill})
                    if ( o.tooltip ) {
                        this.showTooltip([_x, _y], item.graph)
                        tooltip = true
                    }
                    break
                }
            }

            if (!tooltip && this.tooltip) {
                this.tooltip.remove()
                this.tooltip = null
            }
        }
    }

    add(index, [x, y], shift, align){
        this.addPoint(index, [x, y], shift)

        this.minX = this.data[index][0][0]
        this.maxX = x

        if (align) {
            if (isObject(align)) {
                this.align(align)
            }
        } else {
            if (y < this.minY) this.minY = y
            if (y > this.maxY) this.maxY = y
        }

        this.resize()
    }

    align({minX, maxX, minY, maxY}){
        let a = []

        for (let _data of this.data) {
            if (!Array.isArray(_data)) continue

            for( const [x, y] of _data) {
                a.push([x, y])
            }
        }

        const [_minX, _maxX] = minMax(a, 'x')
        const [_minY, _maxY] = minMax(a, 'y')

        if (minX) this.minX = _minX
        if (minY) this.minY = _minY
        if (maxX) this.maxX = _maxX
        if (maxY) this.maxY = _maxY
    }

    draw(){
        super.draw()
        this.calcRatio()
        this.axisXY()
        this.arrows()
        this.lines()
        this.floatPoint()
        this.cross()
        this.legend()
    }
}

Object.assign(LineChart.prototype, MixinCross)
Object.assign(LineChart.prototype, MixinAxis)
Object.assign(LineChart.prototype, MixinAddPoint)
Object.assign(LineChart.prototype, MixinArrows)

export const lineChart = (el, data, options) => new LineChart(el, data, options)