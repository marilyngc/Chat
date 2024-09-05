import express from "express"; 
import morgan from "morgan";
import { Server as socketServer} from "socket.io";
import http from "http";
import cors from "cors";
import { config } from "./config/config.js";

const app = express();
const server = http.createServer(app); // convertimos a servidor http
const io = new socketServer(server,{
    cors:{
        origin:"*",
    }
}) // incluye el http al socket


app.use(cors()); // cualquier servidor externo al local podrá registrarse
app.use(morgan("dev")); // avisa las peticiones que se realizan

io.on("connection", () => {
    console.log("un usuario conectado");
});

server.listen(config.server.port);
console.log("estamos en el puerto" )
