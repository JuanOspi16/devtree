import User from "../models/User";
import slug from "slug";
import { hashPassword } from "../utils/auth";
import { Request, Response } from "express";

export const createAccount = async (req : Request, res : Response) => {

    //Validar que no exista un usuario con el mismo email
    const {email, password} = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        const error = new Error("El usuario ya existe");
        res.status(409).json({ error: error.message });
        return;
    }

    const handle = slug(req.body.handle, '_');
    //Validar que no exista un usuario con el mismo handle
    const existingHandle = await User.findOne({ handle });
    if (existingHandle) {
        const error = new Error("Nombre de usuario ya existe");
        res.status(409).json({ error: error.message });
        return;
    }


    const user = new User(req.body);
    user.password = await hashPassword(password);
    user.handle = handle;
    await user.save();

    res.status(201).send("Registro creado correctamente");
};