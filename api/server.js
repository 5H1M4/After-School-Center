import express from 'express';
import cors from 'cors';
import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Configure CORS
const corsOptions = {
  origin: ['https://qenderpasshkolleameli.vercel.app', 'http://localhost:3000'],
  methods: ['GET', 'POST'],
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());

// Initialize SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Registration endpoint
app.post('/api/register', async (req, res) => {
  try {
    const { name, email, program } = req.body;
    
    const msg = {
      to: 'endy.shima@gmail.com',
      from: 'dailydrivejaguar@gmail.com',
      subject: `New Registration: ${program}`,
      text: `Name: ${name}\nEmail: ${email}\nProgram: ${program}`,
      html: `
        <h3>New Registration</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Program:</strong> ${program}</p>
      `
    };

    await sgMail.send(msg);
    res.status(200).json({ message: 'Registration successful' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ 
      message: 'Registration failed',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// Contact form endpoint
app.post('/api/send-email', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    
    const msg = {
      to: 'endy.shima@gmail.com',
      from: 'dailydrivejaguar@gmail.com',
      subject: `New Contact Form Message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
      `
    };

    await sgMail.send(msg);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({ 
      message: 'Failed to send email',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

export default app; 