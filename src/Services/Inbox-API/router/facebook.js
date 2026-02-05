import express from 'express';
import { FacebookReceiver, FacebookVerifier } from '../controller/facebook';
const router = express.Router();

router.get('/webhook', FacebookVerifier);
router.post('/webhook', FacebookReceiver);

export default router;
