import { useEffect, useRef, useState } from 'react'
import { fabric } from 'fabric'

interface CanvasProps {
    onImageUpload?: (file: File) => void
}

export default function Canvas({ onImageUpload }: CanvasProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [canvas, setCanvas] = useState<fabric.Canvas | null>(null)
    const canvasContainerRef = useRef<null | HTMLDivElement>(null)
    const [textInput, setTextInput] = useState('')

    useEffect(() => {
        if (canvasRef.current) {
            const fabricCanvas = new fabric.Canvas(canvasRef.current, {
                height: canvasContainerRef.current?.clientHeight,
                width: canvasContainerRef.current?.clientWidth,
                backgroundColor: 'white'
            })

            fabric.textureSize = 65536
            setCanvas(fabricCanvas)

            return () => {
                fabricCanvas.dispose()
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

    const addTextToCanvas = () => {
        if (canvas && textInput.trim()) {
            const text = new fabric.Text(textInput, {
                left: 50,
                top: 50,
                fontFamily: 'Arial',
                fontSize: 24,
                fill: '#000000'
            })
            text.setControlsVisibility({
                mt: false,
                mb: false,
                ml: false,
                mr: false,
            })
            canvas.add(text)
            canvas.setActiveObject(text)
            canvas.renderAll()
            setTextInput('')
        }
    }

    const handleTextInputKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            addTextToCanvas()
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
            <div className='flex gap-2 items-center'>
                <input
                    type="text"
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                    onKeyPress={handleTextInputKeyPress}
                    placeholder="Enter text to add to canvas"
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    onClick={addTextToCanvas}
                    disabled={!textInput.trim()}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                    Add Text
                </button>
            </div>
            <div ref={canvasContainerRef} className='flex justify-center relative rounded-lg overflow-hidden h-[calc(90vw/0.75)] md:max-h-[792px] md:h-[46vw] lg:h-[35vw] md:max-w-[calc((792px/4)*3)] md:w-[calc(46vw*0.75)] lg:w-[calc(35vw*0.75)] max-h-[495px] w-[90vw]'>
                <canvas ref={canvasRef} />
            </div>
        </div>
    )
}
