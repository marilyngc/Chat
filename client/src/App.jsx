
import './App.css'
import io from "socket.io-client";

const socket = io("http://localhost:8080"); // me devuelve un objeto para usar en el backend

function App() {
 

  return (
    <>
      <div>
      <h1>Vite + React</h1>
      </div>
     
    
    </>
  )
}

export default App
