import { useEffect, useRef, useState } from 'react'
import { fabric } from 'fabric'
import TextControls from './TextControls'

interface CanvasProps {
    onImageUpload?: (file: File) => void
}

export default function Canvas({ onImageUpload }: CanvasProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [canvas, setCanvas] = useState<fabric.Canvas | null>(null)
    const canvasContainerRef = useRef<null | HTMLDivElement>(null)
    const [relativeObjectCoords, setRelativeObjectCoords] = useState({ x: 0, y: 0 })
    const [selectedTextFontSize, setSelectedTextFontSize] = useState<number | null>(null)

    const calculatedCoord = (x: number, y: number) => {
        const height = canvasContainerRef.current?.clientHeight || 1
        const width = canvasContainerRef.current?.clientWidth || 1

        const scaleX = width / (width - x)
        const scaleY = height / (height - y)

        return { x: Number(scaleX.toFixed(2)), y: Number(scaleY.toFixed(2)) }
    }

    const calculateFontSize = (fontSize: number) => {
        const height = canvasContainerRef.current?.clientHeight || 1
        const calculatedSize = height/ fontSize
        return Math.round(calculatedSize)
    }
        

    useEffect(() => {
        let fabricCanvas: fabric.Canvas | null = null
        if (canvasRef.current) {
            fabricCanvas = new fabric.Canvas(canvasRef.current, {
                height: canvasContainerRef.current?.clientHeight,
                width: canvasContainerRef.current?.clientWidth,
                backgroundColor: 'white'
            })

            fabric.textureSize = 65536
            setCanvas(fabricCanvas)

            // Add event listeners for object selection and movement
            fabricCanvas.on('selection:created', (e) => {
                const obj= e.selected?.[0] as fabric.Text
                if (obj) {
                    setRelativeObjectCoords({ x: Math.round(obj.left || 0), y: Math.round(obj.top || 0) })
                    if (obj.type === 'text') {
                        setSelectedTextFontSize(calculateFontSize(obj.fontSize || 0))
                    } else {
                        setSelectedTextFontSize(null)
                    }
                }
            })

            fabricCanvas.on('selection:updated', (e) => {
                const obj = e.selected?.[0] as fabric.Text
                if (obj) {
                    setRelativeObjectCoords(calculatedCoord((obj.left || 0), Math.round(obj.top || 0)))
                    if (obj.type === 'text') {
                        setSelectedTextFontSize(calculateFontSize(obj.fontSize || 0))
                    } else {
                        setSelectedTextFontSize(null)
                    }
                }
            })

            fabricCanvas.on('object:moving', (e) => {
                const obj = e.target as fabric.Text
                if (obj) {
                    setRelativeObjectCoords(calculatedCoord((obj.left || 0), Math.round(obj.top || 0)))
                    if (obj.type === 'text') {
                        setSelectedTextFontSize(calculateFontSize(obj.fontSize || 0))
                    } else {
                        setSelectedTextFontSize(null)
                    }
                }
            })

            fabricCanvas.on('object:scaling', (e) => {
                const obj = e.target as fabric.Text
                if (obj && obj.type === 'text') {
                    // fontSize is scaled by scaleY (or scaleX if you want horizontal scaling)
                    const textObj = obj as fabric.Text;
                    const newFontSize = (textObj.fontSize || 0) * (textObj.scaleY || 1)
                    obj.set({ fontSize: Math.round(newFontSize) })
                    setSelectedTextFontSize(calculateFontSize(Math.round(newFontSize)))
                }
            })

            fabricCanvas.on('selection:cleared', () => {
                setRelativeObjectCoords({ x: 0, y: 0 })
                setSelectedTextFontSize(null)
            })

            // Keyboard event for deleting selected text
            const handleKeyDown = (e: KeyboardEvent) => {
                if (!fabricCanvas) return
                if ((e.key === 'Delete' || e.key === 'Backspace')) {
                    const active = fabricCanvas.getActiveObject()
                    if (active && active.type === 'text') {
                        fabricCanvas.remove(active)
                        fabricCanvas.discardActiveObject()
                        fabricCanvas.requestRenderAll()
                    }
                }
            }
            window.addEventListener('keydown', handleKeyDown)

            return () => {
                window.removeEventListener('keydown', handleKeyDown)
                if (fabricCanvas) fabricCanvas.dispose()
            }
        }
    }, [])

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file && canvas) {
            onImageUpload?.(file)

            const reader = new FileReader()
            reader.onload = (e) => {
                const imgUrl = e.target?.result as string
                fabric.Image.fromURL(imgUrl, (img) => {
                    img.set({
                        scaleX: (canvas?.width ?? 1) / (img?.width ?? 1),
                        scaleY: (canvas?.height ?? 1) / (img?.height ?? 1),
                    })

                    canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas))
                })
                canvas?.requestRenderAll()
            }
            reader.readAsDataURL(file)
        }
        canvas?.requestRenderAll()
    }

    const handleAddText = (text: string) => {
        if (canvas && text.trim()) {
            const textObject = new fabric.Text(text, {
                left: 50,
                top: 50,
                fontFamily: 'Arial',
                fontSize: 24,
                fill: '#000000',
                originX: 'center',
                originY: 'center',
                scaleY: 1,
            })
            textObject.setControlsVisibility({
                mt: false,
                mb: false,
                ml: false,
                mr: false,
            })
            canvas.add(textObject)
            canvas.setActiveObject(textObject)
            canvas.renderAll()
        }
    }

    return (
        <div className='flex flex-col gap-4 items-center'>
            <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            <TextControls onAddText={handleAddText} coordinates={relativeObjectCoords} fontSize={selectedTextFontSize} />
            <div ref={canvasContainerRef} className='flex justify-center relative rounded-lg overflow-hidden h-[calc(90vw/0.75)] md:max-h-[792px] md:h-[46vw] lg:h-[35vw] md:max-w-[calc((792px/4)*3)] md:w-[calc(46vw*0.75)] lg:w-[calc(35vw*0.75)] max-h-[495px] w-[90vw]'>
                <canvas ref={canvasRef} />
            </div>
        </div>
    )
}
