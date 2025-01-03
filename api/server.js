import express from 'express';
import cors from 'cors';
import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';

dotenv.config();
console.log('API Server Starting...');
console.log('Environment:', process.env.NODE_ENV);
console.log('SENDGRID_API_KEY exists:', !!process.env.SENDGRID_API_KEY);

const app = express();

// Logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  console.log('Headers:', req.headers);
  next();
});

app.use(cors());
app.use(express.json());

// Separate handler function for better error handling
const handleRegistration = async (req, res) => {
  try {
    console.log('Registration request body:', req.body);
    const { name, email, program } = req.body;

    if (!name || !email || !program) {
      console.log('Validation failed:', { name, email, program });
      return res.status(400).json({
        success: false,
        message: 'Të gjitha fushat janë të detyrueshme'
      });
    }

    // Verify SendGrid configuration
    if (!process.env.SENDGRID_API_KEY) {
      console.error('SendGrid API key is missing');
      return res.status(500).json({
        success: false,
        message: 'Email service configuration error'
      });
    }

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

    console.log('Attempting to send email:', msg);
    await sgMail.send(msg);
    console.log('Email sent successfully');

    return res.status(200).json({
      success: true,
      message: 'Regjistrimi u krye me sukses'
    });
  } catch (error) {
    console.error('Registration error:', error);
    console.error('Error details:', {
      name: error.name,
      message: error.message,
      stack: error.stack,
      response: error.response?.body
    });

    return res.status(500).json({
      success: false,
      message: 'Regjistrimi dështoi. Ju lutemi provoni përsëri.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Registration endpoint
app.post('/api/register', handleRegistration);

// Test endpoint
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

export default app; 