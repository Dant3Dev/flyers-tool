import './App.css'
import Canvas from './components/Canvas'

function App() {
  const handleImageUpload = (file: File) => {
    console.log('Image uploaded:', file.name)
    // Add any additional logic here if needed
  }

  return (
    <div className=' h-full flex flex-col gap-10'>
      <h1>Flyers Tool</h1>
      <Canvas onImageUpload={handleImageUpload} />
    </div>
  )
}

export default App
