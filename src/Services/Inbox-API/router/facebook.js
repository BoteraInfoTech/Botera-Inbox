import express from 'express';
import { FacebookReceiver } from '../controller/facebook';
const router = express.Router();

// open Endpoints
router.post('/', () => {});

router.get('/facebook', () => {});
router.post('/facebook', FacebookReceiver);

export default router;
