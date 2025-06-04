import { useState } from 'react'
import CoordinateDisplay from './CoordinateDisplay'
import { Input } from './ui/input'
import { Button } from './ui/button'

interface TextControlsProps {
  onAddText: (text: string) => void
  coordinates: { x: number; y: number }
  fontSize?: number | null
}

export default function TextControls({ onAddText, coordinates, fontSize }: TextControlsProps) {
  const [textInput, setTextInput] = useState('')

  const handleAddText = () => {
    if (textInput.trim()) {
      onAddText(textInput)
      setTextInput('')
    }
  }

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleAddText()
    }
  }

  return (
    <div className='flex flex-col gap-4 items-center w-[30rem]'>
      <div className='flex gap-2 items-center w-full'>
        <Input
          type="text"
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter text to add to canvas"
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Button
          onClick={handleAddText}
          disabled={!textInput.trim()}
        >
          Add Text
        </Button>
      </div>
      <CoordinateDisplay s={fontSize || 0} x={coordinates.x} y={coordinates.y} />
    </div>
  )
}
