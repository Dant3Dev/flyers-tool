import { useState } from 'react'
import CoordinateDisplay from './CoordinateDisplay'

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
    <div className='flex flex-col gap-4 items-center'>
      <div className='flex gap-2 items-center'>
        <input
          type="text"
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter text to add to canvas"
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleAddText}
          disabled={!textInput.trim()}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Add Text
        </button>
      </div>
      <CoordinateDisplay s={fontSize || 0} x={coordinates.x} y={coordinates.y} />
    </div>
  )
}
