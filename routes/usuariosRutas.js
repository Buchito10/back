import { Router } from "express";
import { register, login, getUsers, getUserById, deleteUserById, updateUserById } from "../db/usuariosBD.js";
const router = Router();

router.post("/registro", async(req,res)=>{
    const respuesta = await register(req.body)
    res.cookie('token',respuesta.token).status(respuesta.status).json(respuesta.mensajeUsuario);
});

router.post("/ingresar", async(req,res)=>{
    const respuesta = await login(req.body)
    res.status(respuesta.status).json(respuesta);
});

//Usuarios mostrar
router.get("/usuarios", async (req, res) => {
    const respuesta = await getUsers();
    res.status(respuesta.status).json(respuesta);
});

//Buscar por Id
router.get("/usuarios/:id", async (req, res) => {
    const respuesta = await getUserById(req.params.id);
    res.status(respuesta.status).json(respuesta);
});

//Borrar por Id
router.delete("/usuarios/:id", async (req, res) => {
    const respuesta = await deleteUserById(req.params.id);
    res.status(respuesta.status).json(respuesta);
});

//Editar por Id
router.put("/usuarios/:id", async (req, res) => {
    const respuesta = await updateUserById(req.params.id, req.body);
    res.status(respuesta.status).json(respuesta);
});

/*router.get("/salir", async(req,res)=>{
    res.send("Estas en salir");
});

router.get("/usuarios", async(req,res)=>{
    res.send("Estas en usuarios");
});

router.get("/administradores", async(req,res)=>{
    res.send("Estas en administradores");
});

router.get("/todos", async(req,res)=>{
    res.send("Estas en todos");
});*/

export default router;