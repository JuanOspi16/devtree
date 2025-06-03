import {Router} from 'express';
import { createAccount } from './handlers';

const router = Router();

router.get('/', (req, res) => {
    res.send('Hola express / Typescript')
});

router.post('/auth/register', createAccount);

export default router;