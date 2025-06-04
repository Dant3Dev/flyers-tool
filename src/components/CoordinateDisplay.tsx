interface CoordinateDisplayProps {
  x: number
  y: number
  s: number
}

import CopyCoordinatesButton from './CopyCoordinatesButton';
import { Input } from './ui/input'

export default function CoordinateDisplay({ x, y, s }: CoordinateDisplayProps) {
  return (
    <div className="flex flex-col gap-2 items-center w-full">
      <div className='flex gap-2 items-center'>
        <label className="text-sm font-medium">X:</label>
        <Input
          type="number"
          value={x}
          readOnly
          className="w-20 px-2 py-1 border border-gray-300 rounded-md bg-gray-50 text-sm text-white"
        />
        <label className="text-sm font-medium">Y:</label>
        <Input
          type="number"
          value={y}
          readOnly
          className="w-20 px-2 py-1 border border-gray-300 rounded-md bg-gray-50 text-sm text-white"
        />
        <label className="text-sm font-medium">S:</label>
        <Input
          type="number"
          value={s}
          readOnly
          className="w-20 px-2 py-1 border border-gray-300 rounded-md bg-gray-50 text-sm text-white"
        />
      </div>
      <div className=" bg-slate-700 p-2 rounded-md w-full flex gap-2 justify-center items-center">
        <label className="text-sm font-medium text-white">Coordinates Array: </label>
        <span className='w-[12rem] text-white'>
          {`[${x}, ${y}, ${s}]`}
        </span>
        <CopyCoordinatesButton coords={[x, y, s]} />
      </div>
    </div>
  )
}
