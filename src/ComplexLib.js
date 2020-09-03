export default class Complex {
    #x = 0
    #y = 0
    constructor(x,y){
         this.#x = x
         this.#y = y
    }
    toString(){
        return `${this.#x}${this.#y>0?` + ${Math.abs(this.#y)}i`:this.#y<0?` - ${Math.abs(this.#y)}i`:''}`
    }
    get re(){return this.#x}
    get im(){return this.#y}
    get magnitude(){return (this.#x**2 + this.#y**2)**0.5}
    static add(c1,c2){return new Complex(c1.#x + c2.#x,c1.#y + c2.#y)}
    static sub(c1,c2){return new Complex(c1.#x - c2.#x,c1.#y - c2.#y)}
    static mult(c1,c2){return new Complex(c1.#x * c2.#x - c1.#y * c2.#y,c1.#x * c2.#y + c1.#y * c2.#x)}
    static div(c1,c2){
        let squares = c1.#x**2 - c2.#y**2
        return new Complex(Complex.re(c1)/squares,-Complex.im(c1)/squares)
    }
}