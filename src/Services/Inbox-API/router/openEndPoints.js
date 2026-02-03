import express from 'express';
const router = express.Router();

// open Endpoints
router.get('/', (req, res) => {
  return res.status(200).json({ message: 'Welcome to the Botera Inbox API' });
});

export default router;
