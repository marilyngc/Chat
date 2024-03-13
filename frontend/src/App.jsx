import React, { useState ,useEffect} from 'react'
import io from "socket.io-client";
import './App.css'


// conectamos al backend
const socket = io("/");// está en vite.cofig
function App() {
  const [message, setMessage] = useState(" ");
  const [messages, setMessages] = useState([]);
 
  const handleSudmit = (e) => {
    e.preventDefault();

    const newMessage = {
      body:message,
      from:"Me"
    }
    // mandamos mensaje al backend
    socket.emit("message",message);

    // guardar mensaje que yo envio
    setMessages([...messages,newMessage]);
  }

  //recibimos el mensaje global
  useEffect(() => {
    socket.on("message",message => {
      console.log(message);
      // concatenamos cada mensaje al arreglo
      receiveMessage;
    });
    return() => {
      socket.off("message",receiveMessage);
    }
  },[]);

  const receiveMessage = message => setMessages(state => [...state,message]);
  return (
    <>
      <div>
        <h1>Página del chat</h1>


        <p>Bienvenido <span id="userName"> </span></p>


        <div id="chatPanel"></div>
        <form onSubmit={handleSudmit}>
        <input type="text" placeholder="ingresa el mensaje" 
        onChange={(e) => setMessage(e.target.value)} />
         {/* accedo al mensaje ingresado */}
        <button id="sendMsg">Enviar</button>
        </form>

        <ul>
         {
          messages.map((message, index) => (
            <li key={index}>{message.form}:{message.body}</li>
          ))
         }
        </ul>



      </div>

    </>
  )
}

export default App
