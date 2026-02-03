import express from 'express';
import { FacebookReceiver } from '../controller/facebook';
const router = express.Router();

// open Endpoints

router.get('/', (req, res) => {
  return res
    .status(200)
    .json({ message: 'webhook is healthy', code: 200, status: 'success' });
});
router.post('/', FacebookReceiver);

export default router;
