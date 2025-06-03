interface CoordinateDisplayProps {
  x: number
  y: number
}

export default function CoordinateDisplay({ x, y }: CoordinateDisplayProps) {
  return (
    <div className='flex gap-2 items-center'>
      <label className="text-sm font-medium">X:</label>
      <input
        type="number"
        value={x}
        readOnly
        className="w-20 px-2 py-1 border border-gray-300 rounded-md bg-gray-50 text-sm text-black"
      />
      <label className="text-sm font-medium">Y:</label>
      <input
        type="number"
        value={y}
        readOnly
        className="w-20 px-2 py-1 border border-gray-300 rounded-md bg-gray-50 text-sm text-black"
      />
    </div>
  )
}
