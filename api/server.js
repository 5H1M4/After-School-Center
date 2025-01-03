import express from 'express';
import cors from 'cors';
import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';

dotenv.config();
console.log('Environment:', process.env.NODE_ENV);
console.log('SENDGRID_API_KEY exists:', !!process.env.SENDGRID_API_KEY);

const app = express();

// Enhanced CORS configuration
const corsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = ['https://qenderpasshkolleameli.vercel.app', 'http://localhost:3000'];
    console.log('Request origin:', origin);
    callback(null, allowedOrigins.includes(origin) || !origin);
  },
  methods: ['POST', 'GET'],
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());

// Initialize SendGrid with error handling
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
if (!SENDGRID_API_KEY) {
  console.error('Warning: SENDGRID_API_KEY is not set');
}
sgMail.setApiKey(SENDGRID_API_KEY);

// Test endpoint
app.get('/api/test', (req, res) => {
  console.log('Test endpoint hit');
  res.json({ message: 'API is working' });
});

app.post('/api/register', async (req, res) => {
  console.log('Registration endpoint hit');
  console.log('Request headers:', req.headers);
  console.log('Request body:', req.body);
  
  try {
    const { name, email, program } = req.body;
    
    if (!name || !email || !program) {
      console.log('Missing required fields:', { name, email, program });
      return res.status(400).json({ 
        message: 'Të gjitha fushat janë të detyrueshme' 
      });
    }

    console.log('Preparing to send confirmation email');
    const msg = {
      to: email,
      from: 'dailydrivejaguar@gmail.com',
      subject: `Konfirmim Regjistrimi: ${program}`,
      html: `
        <h3>Konfirmim Regjistrimi</h3>
        <p>Përshëndetje ${name},</p>
        <p>Faleminderit për regjistrimin në programin <strong>${program}</strong>.</p>
        <p>Me respekt,<br>Qendra Pas Shkollës Ameli</p>
      `
    };

    console.log('Sending confirmation email');
    await sgMail.send(msg);
    console.log('Confirmation email sent successfully');

    console.log('Sending admin notification');
    const adminMsg = {
      to: 'endy.shima@gmail.com',
      from: 'dailydrivejaguar@gmail.com',
      subject: `Regjistrim i Ri: ${program}`,
      html: `
        <h3>Regjistrim i Ri</h3>
        <p><strong>Emri:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Programi:</strong> ${program}</p>
      `
    };

    await sgMail.send(adminMsg);
    console.log('Admin notification sent successfully');

    res.status(200).json({ message: 'Regjistrimi u krye me sukses' });
  } catch (error) {
    console.error('Detailed registration error:', {
      name: error.name,
      message: error.message,
      stack: error.stack,
      response: error.response?.body
    });
    
    res.status(500).json({ 
      message: 'Regjistrimi dështoi',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

export default app; 