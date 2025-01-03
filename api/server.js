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

app.post('/api/register', async (req, res) => {
  try {
    const { name, email, program } = req.body;
    
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

    await sgMail.send(msg);

    // Send notification to admin
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
    res.status(200).json({ message: 'Regjistrimi u krye me sukses' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Regjistrimi dështoi' });
  }
});

export default app; 