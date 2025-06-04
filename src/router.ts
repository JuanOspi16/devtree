import {Router} from 'express';
import { body } from 'express-validator';
import { createAccount, login} from './handlers/index';

const router = Router();

router.get('/', (req, res) => {
    res.send('Hola express / Typescript')
});

router.post('/auth/register', 
    body('handle').notEmpty().withMessage('El nombre de usuario es obligatorio'),
    body('name').notEmpty().withMessage('El nombre es obligatorio'),
    body('email').isEmail().withMessage('El email es obligatorio y debe ser válido'),
    body('password').isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres'),
    createAccount);

router.post('/auth/login',
    body('email').isEmail().withMessage('El email debe ser válido'),
    body('password').isLength({ min: 8 }).withMessage('La contraseña es obligatoria'),
    login);

export default router;