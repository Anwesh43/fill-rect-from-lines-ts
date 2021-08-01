const w : number = window.innerWidth 
const h : number = window.innerHeight 
const parts : number = 4 
const scGap : number = 0.04 / parts 
const delay : number = 20 
const sizeFactor : number = 6.9 
const strokeFactor : number = 90 
const backColor : string = "#BDBDBD"
const deg : number = Math.PI / 2
const colors : Array<string> = [
    "#B71C1C",
    "#00C853",
    "#FF6D00",
    "#6200EA",
    "#F50057"
]

class ScaleUtil {

    static maxScale(scale : number, i : number, n : number) : number {
        return Math.max(0, scale - i / n)
    }

    static divideScale(scale : number, i : number, n : number) : number {
        return Math.min(1 / n, ScaleUtil.divideScale(scale, i, n)) * n 
    }
}

class DrawingUtil {

    static drawLine(context : CanvasRenderingContext2D, x1 : number, y1 : number, x2 : number, y2 : number) {
        context.beginPath()
        context.moveTo(x1, y1)
        context.lineTo(x2, y2)
        context.stroke()
    }

    static drawFillRectFromLines(context : CanvasRenderingContext2D, scale : number) {
        const size : number = Math.min(w, h) / sizeFactor 
        const sc1 : number = ScaleUtil.divideScale(scale, 0, parts)
        const sc2 : number = ScaleUtil.divideScale(scale, 1, parts)
        const sc3 : number = ScaleUtil.divideScale(scale, 2, parts)
        const sc4 : number = ScaleUtil.divideScale(scale, 3, parts)
        const y : number =  h / 2 + context.lineWidth / 2 - (h / 2 - size / 2) * sc2 
        context.save()
        context.translate(w / 2 + (w / 2 + size / 2 + context.lineWidth / 2) * sc4, h / 2)
        context.rotate(deg * sc4)
        for (let j = 0; j < 2; j++) {
            context.save()
            context.scale(1 - 2 * j, 1)
            context.translate(context.lineWidth / 2 + (w / 2) - (w / 2 - size / 2) * sc1, 0)
            DrawingUtil.drawLine(context, 0, -size / 2, 0, size / 2)
            context.restore()
        }
        DrawingUtil.drawLine(context, -size / 2, y, size / 2, y)
        context.fillRect(-size / 2, size / 2 - (size) * sc3, size, size * sc3)
        context.restore()
    }

    static drawFRLNode(context : CanvasRenderingContext2D, i : number, scale : number) {
        context.lineCap = 'round'
        context.lineWidth = Math.min(w, h) / strokeFactor
        context.fillStyle = colors[i]
        context.strokeStyle = colors[i]
        DrawingUtil.drawFillRectFromLines(context, scale)
    }
}

