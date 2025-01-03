import express from 'express';
import cors from 'cors';
import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';

dotenv.config();
console.log('API Server Starting...');
console.log('Environment:', process.env.NODE_ENV);
console.log('SENDGRID_API_KEY exists:', !!process.env.SENDGRID_API_KEY);

const app = express();

app.use((req, res, next) => {
  console.log('Request received:', {
    method: req.method,
    path: req.path,
    headers: req.headers,
    body: req.body
  });
  next();
});

app.use(cors());
app.use(express.json());

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
if (!SENDGRID_API_KEY) {
  console.error('Warning: SENDGRID_API_KEY is not set');
}
sgMail.setApiKey(SENDGRID_API_KEY);

app.post('/api/register', async (req, res) => {
  console.log('Registration endpoint hit');
  console.log('Request body:', req.body);
  
  try {
    const { name, email, program } = req.body;
    console.log('Extracted data:', { name, email, program });
    
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

    try {
      console.log('Sending confirmation email...');
      await sgMail.send(msg);
      console.log('Confirmation email sent successfully');
    } catch (emailError) {
      console.error('Email sending error:', emailError);
      console.error('SendGrid response:', emailError.response?.body);
      throw emailError;
    }

    res.status(200).json({ message: 'Regjistrimi u krye me sukses' });
  } catch (error) {
    console.error('Registration error:', {
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

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Global error handler:', err);
  res.status(500).json({
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

export default app; 