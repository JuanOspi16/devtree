import User from "../models/User";
import { Request, Response } from "express";

export const createAccount = async (req : Request, res : Response) => {

    //Validar que no exista un usuario con el mismo email
    const {email} = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        const error = new Error("El usuario ya existe");
        res.status(409).json({ error: error.message });
        return;
    }

    const user = new User(req.body);
    await user.save();

    res.status(201).send("Registro creado correctamente");
};