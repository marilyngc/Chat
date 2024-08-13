import express from "express";
import {__dirname } from "./utils.js";
import { viewsRouter } from "./routes/views.routes.js";
import { Server } from "socket.io";
import { connectDB } from "./config/dbConnection.js";
import { config } from "./config/config.js";
import  logger  from "morgan";
import { createServer } from "node:http";
import cors from "cors";


const port =  config.server.port;
// servidor de http con express
const app = express();
const server = createServer(app);
// servidor de websocket
const io = new Server(server, {
    cors: {
      origin: "*", // Configura esto según tus necesidades
      methods: ["GET", "POST"]
    }
  });

app.use(express.static(path.join(__dirname, 'frontend/dist')));
app.use(logger("dev"));
app.use(cors());

server.listen(port,()=> {console.log(`server working on ${port}`)});

// conexion base de datos
connectDB();

// routes
app.use(viewsRouter);




// socket servidor
io.on("connection",(socket)=>{
    //cuando se conecta el usuario, le enviamos el historial del chat
    console.log(socket.id);
    // socket.emit("chatHistory", chat);

// recibimos el mensaje de cada usuario
    socket.on("message", (body)=>{
        console.log("body global",body);
        //mandamos un mensaje global
        socket.broadcast.emit("message",{
            //contenido del mensaje
            body,
            from:socket.id.slice(6)
        });
        // io.emit("message",body);

        // // enviamos el historial del chat a todos los ususrios conectados
        // io.emit("chatHistory",chat);
    });

  

    // recibimos mensaje de coneccion de nuevo cliente
    socket.on("authenticated",(data)=>{
        // => broadcast es para emitir la información al todos los usuarios menos al que se está logueando
        socket.broadcast.emit("newUser",`El usuario ${data.name} se acaba de conectar `)
    });

    socket.on("disconnect", () => {
        console.log("se a desconectado un usuario");
    })
});