import { Canvas } from '@react-three/fiber'
import './App.css'
import Dog from './components/Dog'
import { Environment } from '@react-three/drei'

function App() {
  return (
    <>
      <main>
        <Canvas style={{ height: "100vh", width: "100vw", position: "fixed", top: 0, left: 0, zIndex: 1, backgroundImage: "url('/background-1.png')", backgroundSize: "cover" }}>
          <Dog />
          <Environment preset='city' />
        </Canvas>
        <section id='sectoin-1'></section>
        <section id='sectoin-2'></section>
        <section id='sectoin-3'></section>
      </main>
    </>
  )
}

export default App