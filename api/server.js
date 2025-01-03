import express from 'express';
import cors from 'cors';
import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Initialize SendGrid
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
sgMail.setApiKey(SENDGRID_API_KEY);

// Test SendGrid configuration
const testSendGridConfig = async () => {
  try {
    if (!SENDGRID_API_KEY) {
      throw new Error('SENDGRID_API_KEY is not configured');
    }
    console.log('SendGrid API Key is configured');
    return true;
  } catch (error) {
    console.error('SendGrid Configuration Error:', error.message);
    return false;
  }
};

app.post('/api/register', async (req, res) => {
  console.log('Registration endpoint hit');
  
  try {
    // Verify SendGrid configuration first
    const isConfigured = await testSendGridConfig();
    if (!isConfigured) {
      return res.status(500).json({
        success: false,
        message: 'Email service configuration error'
      });
    }

    const { name, email, program } = req.body;
    
    if (!name || !email || !program) {
      return res.status(400).json({
        success: false,
        message: 'Të gjitha fushat janë të detyrueshme'
      });
    }

    const msg = {
      to: email,
      from: {
        email: 'dailydrivejaguar@gmail.com',
        name: 'Qendra Pas Shkollës Ameli'
      },
      subject: `Konfirmim Regjistrimi: ${program}`,
      html: `
        <h3>Konfirmim Regjistrimi</h3>
        <p>Përshëndetje ${name},</p>
        <p>Faleminderit për regjistrimin në programin <strong>${program}</strong>.</p>
        <p>Me respekt,<br>Qendra Pas Shkollës Ameli</p>
      `
    };

    await sgMail.send(msg);
    console.log('Email sent successfully');

    return res.status(200).json({
      success: true,
      message: 'Regjistrimi u krye me sukses'
    });
  } catch (error) {
    console.error('Registration error:', error);
    
    return res.status(500).json({
      success: false,
      message: 'Regjistrimi dështoi. Ju lutemi provoni përsëri.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

export default app; 