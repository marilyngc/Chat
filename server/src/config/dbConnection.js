import mongoose from "mongoose";

export const connectDB = async ()  => {
    try {
        await mongoose.connect("mongodb+srv://Marilyn:bKFBJlXjAWVtcyb7@maricluster.3nfwgsn.mongodb.net/chatDB?retryWrites=true&w=majority");
        console.log("Base de datos conectada correctamente ");
    } catch (error) {
        console.log(`Hubo un error al conectar la base de datos ${error.message}`);
  
    }
}