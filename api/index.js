import express from 'express';
import cors from 'cors';
import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

app.post('/api/register', async (req, res) => {
  // Copy registration logic from server.js
});

app.post('/api/send-email', async (req, res) => {
  // Copy email logic from server.js
});

export default app; 