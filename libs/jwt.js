import 'dotenv/config';
import jwt from "jsonwebtoken";
import { mensajes } from './manejoErrores.js';

export function crearToken(dato){
    return new Promise((reslove,reject)=>{
        jwt.sign(
        dato,
        process.env.SECRET_TOKEN,
        {
            expiresIn:"1d"
        },
        (err,token)=>{
            if(err){
                reject(mensajes(400,"Error al general token"));
            }
            reslove(token);
        }
        );
    });
}