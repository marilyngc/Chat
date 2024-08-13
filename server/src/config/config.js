import dotenv from 'dotenv';

dotenv.config()
export const config = {
    server:{
        port: process.env.PORT || 3000
    },
    mongo:{
        url:process.env.MONGO_URL
    }
}