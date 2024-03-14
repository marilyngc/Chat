import { Router } from "express";

const router = Router();


router.get("/",(req,res)=>{
   res.sendFile(process.cwd() + "/frontend/src/App.jsx")
});


export {router as viewsRouter}