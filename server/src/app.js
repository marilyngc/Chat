import express from "express";
import path from "path";
import {engine} from "express-handlebars";
import { __dirname } from "./utils.js";
import { viewsRouter } from "./routes/views.routes.js";
import { Server } from "socket.io";
import { Socket } from "socket.io";
import { connectDB } from "./config/dbConnection.js";



const port = process.env.PORT || 8080;
const app = express();

//midlewares
app.use(express.json()); // recibir informacion json del cliente
app.use(express.static(path.join(__dirname,"/public"))); // chat/src/public


// servidor de http con express
const httpServer = app.listen(port,()=> console.log("server working"));

// servidor de websocket
const io = new Server(httpServer);


// confuguracion de motor de plantillas handlebars
app.engine('.hbs', engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname,"/views")); // => /src/views


// conexion base de datos
connectDB();

// routes
app.use(viewsRouter);


let chat = [];

// socket servidor
io.on("connection",(socket)=>{
    //cuando se conecta el usuario, le enviamos el historial del chat
    console.log(socket.id);
    socket.emit("chatHistory", chat);

// recibimos el mensaje de cada usuario
    socket.on("message", (body)=>{
        console.log(body);
        //mandamos un mensaje global
        socket.broadcast.emit("body",{
            //contenido del mensaje
            body,
            from:socket.id.slice(6)
        });
        chat.push(data);

        // enviamos el historial del chat a todos los ususrios conectados
        io.emit("chatHistory",chat);
    });

    // recibimos mensaje de coneccion de nuevo cliente
    socket.on("authenticated",(data)=>{
        // => broadcast es para emitir la información al todos los usuarios menos al que se está logueando
        socket.broadcast.emit("newUser",`El usuario ${data.name} se acaba de conectar `)
    });
});