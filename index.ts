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