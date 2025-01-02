import sgMail from '@sendgrid/mail';

export default async function handler(req, res) {
  console.log('Email handler received request:', {
    method: req.method,
    headers: req.headers,
    body: req.body
  });

  if (req.method !== 'POST') {
    console.log('Invalid method:', req.method);
    return res.status(405).json({ message: 'Method not allowed' });
  }

  if (!process.env.SENDGRID_API_KEY) {
    console.error('SendGrid API key is missing');
    return res.status(500).json({ message: 'Server configuration error' });
  }

  try {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    
    const { name, email, message } = req.body;
    console.log('Preparing to send email for:', { name, email });

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

    console.log('Attempting to send email with content:', content);
    await sgMail.send(content);
    console.log('Email sent successfully');
    
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Detailed error:', {
      name: error.name,
      message: error.message,
      stack: error.stack,
      response: error.response?.body
    });
    
    res.status(500).json({ 
      message: 'Error sending email',
      error: error.message,
      details: error.response?.body
    });
  }
} 