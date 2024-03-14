import React, { useState, useEffect } from 'react'
import io from "socket.io-client";
import './App.css'


// conectamos al backend
const socket = io("/");// está en vite.cofig
function App() {
  const [message, setMessage] = useState("");
  // arreglo de mensjes para guardar los mensajes que se envian
  const [messages, setMessages] = useState([]);

  const handleSudmit = (e) => {
    e.preventDefault();
    console.log("mensaje que yo", message)
    
    const newMessage = {
      body: message,
      from: "Me"
    }
    console.log("nuevos mensajes:", newMessage);
     // guardar mensaje que yo envio
     setMessages([...messages, newMessage]);
      // mandamos mensaje al backend
      socket.emit("message", message);
    
      console.log("todos los mensjes", messages)
      //limpiamos el input
      setMessage("");


  }

  //recibimos el mensaje global que viene de otro navegador
  useEffect(() => {
    socket.on("message", receiveMessage);
   
    return () => {
      // que se apague
      socket.off("message", receiveMessage);
    };
  }, []);
  console.log("id:",messages.form)
  // para recetear los mensajes
  const receiveMessage = message => setMessages(state => [...state,message ]);
  return (
    <>
      <div>
        <h1>Página del chat</h1>
        <p>Bienvenido <span id="userName"> </span></p>
        <ul class="chat-thread">
          {
            messages.map((message, index) => (
              <li key={index}>{message.from}:{message.body}</li>
            ))
          }

        </ul>
        <form onSubmit={handleSudmit}>

          {/* <input type="text" placeholder="ingresa el mensaje"
            onChange={(e) => setMessage(e.target.value)} />
          {/* accedo al mensaje ingresado */}


          <div id="js-chatbar" class="chat-bar">
            <div id="js-toggle" class="chat-bar__toggle" onclick="toggle()">
              <i class="material-icons">add</i>
            </div>
            <div class="chat-bar__message">
              <input onChange={(e) => setMessage(e.target.value)} class="chat-bar__input" type="text" placeholder="Message..."value={message} />

            </div>
            <div class="chat-bar__buttons">
              <div class="button b-1"><i class="material-icons">camera_alt</i></div>
              <div class="button b-2"><i class="material-icons">photo</i></div>
              <div class="button b-3"><i class="material-icons">gif</i></div>
              <div class="button b-4"><i class="material-icons">more_horiz</i></div>
            </div>
            {/* <button >Enviar</button>  */}
          </div>

          <a target="_blank" href="https://dribbble.com/shots/6155986-Chat-Bar-Interaction" class="sidenote">Inspired by Oleg Frolov <i class="material-icons">arrow_forward</i></a>

        </form>
      </div>

    </>
  )
}

export default App
