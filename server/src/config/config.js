import dotenv from 'dotenv';

dotenv.config()
export const config = {
    server:{
        port:process.env.SERVER_PORT
    },
    mongo:{
        url:process.env.MONGO_URL
    }
}