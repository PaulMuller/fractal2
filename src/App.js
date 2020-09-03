import React, { useEffect } from 'react'
import * as PIXI from 'pixi.js'
import { Viewport } from 'pixi-viewport'
import Complex from './ComplexLib'

const CHECK_PRESCION = 50  //точность самого Мальденброта
const INFINITY_EDGE = 64 // точность улетания в бесконечность
const CHECK_VALUES = 3 // площа охвата
const MOVEFROMCENTER = 0
const CHECK_STEP = .01 // увеличить плотность постоения
const RENDER_SCALE = 400

export default () => {
    useEffect(() => {
        const app = new PIXI.Application({
            width: window.innerWidth,
            height: window.innerHeight,
            backgroundColor: 0x111111,
            transparent: false,
            resolution: window.devicePixelRatio || 1,
            antialias: true
        })
        document.body.appendChild(app.view)

        const viewport = new Viewport({
            screenWidth: window.innerWidth,
            screenHeight: window.innerHeight,
            interaction: app.renderer.plugins.interaction
        })

        app.stage.addChild(viewport)

        viewport
            .drag()
            .pinch()
            .wheel()
            .decelerate()

        // viewport.setZoom(2)

        const renderTexture = PIXI.RenderTexture.create(window.innerWidth*2, window.innerHeight*2)
        
        const renderTextureSprite = new PIXI.Sprite(renderTexture)

        viewport.addChild(renderTextureSprite)

        const brush = new PIXI.Graphics()

        const drawTail = (x, y, color) => {
            let fillColor //= 0xffffff

            brush.position.x = x + window.innerWidth/2
            brush.position.y = y + window.innerHeight/2

            fillColor = rgb2hex(color)
  
            

            const colorBrush = new PIXI.Graphics()
            
            colorBrush.beginFill(fillColor)
            colorBrush.drawCircle(0, 0, 1)
            colorBrush.endFill()

            colorBrush.position.x = x + window.innerWidth/2
            colorBrush.position.y = y + window.innerHeight/2

            app.renderer.render(colorBrush, renderTexture, false, null, false)
        }
        // drawTail(0,0)


        console.time('1')
        for (let j = -CHECK_VALUES + MOVEFROMCENTER; j < CHECK_VALUES + MOVEFROMCENTER; j+=CHECK_STEP){
            for (let k = -CHECK_VALUES + MOVEFROMCENTER; k < CHECK_VALUES + MOVEFROMCENTER; k+=CHECK_STEP){

                drawTail(j * RENDER_SCALE, k * RENDER_SCALE, checkComplex(new Complex(j,k)))
            }
        }
        console.timeEnd('1')

        return () => {
            document.body.removeChild(app.view)
        }
    }, [])

    return (<></>)
}

const checkComplex = c => {
    let old_c = c
    let new_c = new Complex(0, 0)
    let i = 0
    for (i = 0; i < CHECK_PRESCION; i+=.1){
        new_c = Complex.add(Complex.mult(new_c, new_c), old_c) 

        if (Math.abs(new_c.im) > INFINITY_EDGE || Math.abs(new_c.im) > INFINITY_EDGE) return [i*20, i*100, i]
    }

    return [0, 214, 0]
} 

const rgb2hex = rgb => ((rgb[0] << 16) + (rgb[1] << 8) + rgb[2])






