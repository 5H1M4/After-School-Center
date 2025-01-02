import express from 'express';
import cors from 'cors';
import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Initialize SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

app.post('/api/send-email', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    
    const content = {
      to: 'endy.shima@gmail.com',
      from: 'dailydrivejaguar@gmail.com',
      subject: `New Contact Form Message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    };

    await sgMail.send(content);
    res.json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Error sending email' });
  }
});

app.post('/api/register', async (req, res) => {
  console.log('=== Registration Request Started ===');
  console.log('Request body:', req.body);

  if (!req.body.name || !req.body.email || !req.body.program) {
    console.error('Missing required fields');
    return res.status(400).json({ 
      message: 'Missing required fields',
      received: req.body 
    });
  }

  if (!process.env.SENDGRID_API_KEY) {
    console.error('SendGrid API key is missing');
    return res.status(500).json({ message: 'Server configuration error' });
  }

  try {
    const { name, email, program } = req.body;
    console.log('Validated data:', { name, email, program });
    
    // Send confirmation email to user
    const userEmail = {
      to: email,
      from: 'dailydrivejaguar@gmail.com',
      subject: `Registration Confirmation - ${program}`,
      html: `
        <h3>Thank you for registering!</h3>
        <p>Dear ${name},</p>
        <p>Thank you for registering for ${program}. We will contact you soon with more details.</p>
      `
    };

    // Send notification email to admin
    const adminEmail = {
      to: 'endy.shima@gmail.com',
      from: 'dailydrivejaguar@gmail.com',
      subject: `New Registration - ${program}`,
      html: `
        <h3>New Program Registration</h3>
        <p><strong>Program:</strong> ${program}</p>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
      `
    };

    await Promise.all([
      sgMail.send(userEmail),
      sgMail.send(adminEmail)
    ]);

    res.json({ message: 'Registration successful' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ 
      message: 'Error processing registration',
      error: error.message 
    });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 