import express from 'express';
import cors from 'cors';
import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Configure CORS for production
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? 'https://qenderpasshkolleameli.vercel.app' 
    : 'http://localhost:3000'
};

app.use(cors(corsOptions));
app.use(express.json());

// Initialize SendGrid
if (!process.env.SENDGRID_API_KEY) {
  console.error('SENDGRID_API_KEY is not set');
}
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// API Routes
app.post('/api/register', async (req, res) => {
  console.log('Registration request received:', req.body);
  // Reference to existing registration code
  // startLine: 45
  // endLine: 104
});

app.post('/api/send-email', async (req, res) => {
  console.log('Email request received:', req.body);
  // Reference to existing email code
  // startLine: 20
  // endLine: 43
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ 
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

export default app; 