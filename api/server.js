import express from 'express';
import cors from 'cors';
import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(cors({
  origin: '*',
  methods: ['POST', 'GET', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
if (!SENDGRID_API_KEY) {
  console.error('Warning: SENDGRID_API_KEY is not set');
}
sgMail.setApiKey(SENDGRID_API_KEY);

app.post('/api/register', async (req, res) => {
  console.log('Registration endpoint hit');
  
  try {
    const { name, email, program } = req.body;
    
    if (!name || !email || !program) {
      return res.status(400).json({ 
        message: 'Të gjitha fushat janë të detyrueshme' 
      });
    }

    await sgMail.send({
      to: email,
      from: 'dailydrivejaguar@gmail.com',
      subject: `Konfirmim Regjistrimi: ${program}`,
      html: `
        <h3>Konfirmim Regjistrimi</h3>
        <p>Përshëndetje ${name},</p>
        <p>Faleminderit për regjistrimin në programin <strong>${program}</strong>.</p>
        <p>Me respekt,<br>Qendra Pas Shkollës Ameli</p>
      `
    });

    await sgMail.send({
      to: 'endy.shima@gmail.com',
      from: 'dailydrivejaguar@gmail.com',
      subject: `Regjistrim i Ri: ${program}`,
      html: `
        <h3>Regjistrim i Ri</h3>
        <p><strong>Emri:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Programi:</strong> ${program}</p>
      `
    });

    res.status(200).json({ message: 'Regjistrimi u krye me sukses' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ 
      message: 'Regjistrimi dështoi',
      error: 'Internal server error'
    });
  }
});

export default app; 