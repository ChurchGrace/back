import express from 'express';
import { sendContactForm } from 'src/controllers/contactFormController';

const router = express.Router();

router.route('/').post(sendContactForm);

export default router;
