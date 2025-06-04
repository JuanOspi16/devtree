import User from "../models/User";
import { comparePassword, hashPassword } from "../utils/auth";
import { validationResult } from "express-validator";
import { Request, Response } from "express";
import slug from "slug";

export const createAccount = async (req : Request, res : Response) => {

    //Validar los datos de entrada
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }

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

export const login = async (req: Request, res: Response) => {

    const {email, password} = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        const error = new Error("El usuario no existe");
        res.status(404).json({ error: error.message });
        return;
    }

    const isCorrect = await comparePassword(password, user.password);
    if (!isCorrect) {
        const error = new Error("Contraseña incorrecta");
        res.status(401).json({ error: error.message });
        return;
    }

    res.send("Inicio de sesión exitoso");
};