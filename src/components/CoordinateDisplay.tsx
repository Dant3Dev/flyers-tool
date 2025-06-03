interface CoordinateDisplayProps {
  x: number
  y: number
  s: number
}

import CopyCoordinatesButton from './CopyCoordinatesButton';

export default function CoordinateDisplay({ x, y, s }: CoordinateDisplayProps) {
  return (
    <div className="flex flex-col gap-2 items-center">
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
        <label className="text-sm font-medium">S:</label>
        <input
          type="number"
          value={s}
          readOnly
          className="w-20 px-2 py-1 border border-gray-300 rounded-md bg-gray-50 text-sm text-black"
        />
      </div>
      <div className="bg-gray-700 p-2 rounded-md w-[32rem] flex gap-2 justify-center items-center">
        <label className="text-sm font-medium">Coordinates Array: </label>
        <span className='w-[12rem]'>
          {`[${x}, ${y}, ${s}]`}
        </span>
        <CopyCoordinatesButton coords={[x, y, s]} />
      </div>
    </div>
  )
}
