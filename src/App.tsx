import './App.css'
import Canvas from './components/Canvas'
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card'

function App() {
  const handleImageUpload = (file: File) => {
    console.log('Image uploaded:', file.name)
    // Add any additional logic here if needed
  }

  return (
    <div className='h-screen w-full flex justify-center dark items-center'>
      <Card className='p-10 w-[50svw]'>
        <CardHeader>
          <CardTitle className='text-center text-4xl'>
            Flyers Tool
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Canvas onImageUpload={handleImageUpload} />
        </CardContent>
      </Card>
    </div>
  )
}

export default App
