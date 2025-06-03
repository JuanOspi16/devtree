import User from "../models/User";
import { Request, Response } from "express";

export const createAccount = async (req : Request, res : Response) => {
    const user = new User(req.body);
    await user.save();

    res.send("Registro creado correctamente");
};