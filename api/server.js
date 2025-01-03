import express from 'express';
import cors from 'cors';
import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(cors({
  origin: ['https://qenderpasshkolleameli.vercel.app', 'http://localhost:3000'],
  methods: ['POST', 'GET'],
  credentials: true
}));

app.use(express.json());

// Initialize SendGrid with error handling
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
if (!SENDGRID_API_KEY) {
  console.error('Warning: SENDGRID_API_KEY is not set');
}
sgMail.setApiKey(SENDGRID_API_KEY);

// Test endpoint
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working' });
});

app.post('/api/register', async (req, res) => {
  console.log('Registration request received:', req.body);
  
  try {
    const { name, email, program } = req.body;
    
    if (!name || !email || !program) {
      return res.status(400).json({ 
        message: 'Të gjitha fushat janë të detyrueshme' 
      });
    }

    // Send confirmation to user
    await sgMail.send({
      to: email,
      from: 'dailydrivejaguar@gmail.com', // Your verified sender
      subject: `Konfirmim Regjistrimi: ${program}`,
      html: `
        <h3>Konfirmim Regjistrimi</h3>
        <p>Përshëndetje ${name},</p>
        <p>Faleminderit për regjistrimin në programin <strong>${program}</strong>.</p>
        <p>Me respekt,<br>Qendra Pas Shkollës Ameli</p>
      `
    });

    // Send notification to admin
    await sgMail.send({
      to: 'endy.shima@gmail.com', // Your admin email
      from: 'dailydrivejaguar@gmail.com', // Your verified sender
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
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

export default app; 