import express from 'express';
import sgMail from '@sendgrid/mail';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export default app; 