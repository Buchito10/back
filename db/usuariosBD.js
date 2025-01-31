import User from "../models/usuarioModelo.js";
import { mensajes } from "../libs/manejoErrores.js";

// Register
export async function register({ username, email, password }) {
    try {
        const usuarioExistente = await User.findOne({ username });
        const emailExistente = await User.findOne({ email });

        if (usuarioExistente || emailExistente) {
            return mensajes(400, "Usuario duplicado");
        }

        const { hash, salt } = encriptarPassword(password);
        const data = new User({ username, email, password: hash, salt });
        const respuesta = await data.save();
        return mensajes(200, "Registro agregado correctamente", respuesta);
    } catch (error) {
        return mensajes(400, "Error al registrar el usuario", error);
    }
}

// Login
export async function login({ username, password }) {
    try {
        const usuarioCorrecto = await User.findOne({ username });

        if (!usuarioCorrecto || usuarioCorrecto.password !== password) {
            return mensajes(400, "Datos incorrectos");
        }

        return mensajes(200, "Ingreso correctamente");
    } catch (error) {
        return mensajes(400, "Error en el login", error);
    }
}

// Mostrar Usuarios
export async function getUsers() {
    try {
        const users = await User.find();
        return mensajes(200, "Usuarios obtenidos correctamente", users);
    } catch (error) {
        return mensajes(500, "Error al obtener los usuarios", error);
    }
}

// Buscar por Id
export async function getUserById(id) {
    try {
        const user = await User.findById(id);
        if (!user) return mensajes(404, "Usuario no encontrado");
        return mensajes(200, "Usuario encontrado", user);
    } catch (error) {
        return mensajes(500, "Error al buscar el usuario", error);
    }
}

// Borrar por Id
export async function deleteUserById(id) {
    try {
        await User.findByIdAndDelete(id);
        return mensajes(200, "Usuario borrado correctamente");
    } catch (error) {
        return mensajes(500, "Error al borrar el usuario", error);
    }
}

// Editar por Id
export async function updateUserById(id, userData) {
    try {
        await User.findByIdAndUpdate(id, userData, { new: true });
        return mensajes(200, "Usuario actualizado correctamente");
    } catch (error) {
        return mensajes(500, "Error al actualizar el usuario", error);
    }
}
