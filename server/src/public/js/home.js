console.log("JavaScrip en el frontend");

const socketClient = io();
const userName = document.getElementById("userName");
const inputMsg = document.getElementById("inputMsg");
const sendMsg = document.getElementById("sendMsg");
const chatPanel = document.getElementById("chatPanel");


let user; // variable de identidad del usuario

swal.fire({ // => es una promesa
    title: "Bienvenidos",
    text: "Por favor, ingresa tu nombre de usuario",
    input:"text",
    // validamos los datos ingresados
    inputValidator:(value) => {
        return !value && "No ingresaste tu nombre tu usuario"
    },
    // para que al clickear fuera del span no se cierre
    allowOutsideClick:false,
    allowEscapeKey:false,
}).then((inputValue)=>{
   user = inputValue.value;
   userName.innerHTML = user;
   // mandamos un evento solo cuando el usuario se conecte
   socketClient.emit("authenticated",user);
});


sendMsg.addEventListener("click", ()=>{
    const msg = {user:user, message:inputMsg.value}
    // mandamos el mensaje al servidor
    socketClient.emit("msgChat",msg);
});


// recibe del servidor
socketClient.on("chatHistory", (dataServer)=>{
   let msgElements = "";
   dataServer.forEach(element => {
    // vamos agregandole parrafo a cada mensaje
      msgElements+= `<p>Usuario: ${element.user}:  ${element.message}`
   });

   // mostramos el historial completo
   chatPanel.innerHTML = msgElements;
});


// recibimos al cliente que se acaba de conectar
socketClient.on("newUser",(data) =>{
    // si el usuario ya se registró
    if (user) {
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: data,
            showConfirmButton: false,
            timer: 1500
          });
    }
   
});