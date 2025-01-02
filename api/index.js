import express from 'express';
import cors from 'cors';
import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export default {
  async fetch(request, env) {
    if (request.method === 'POST') {
      const { pathname } = new URL(request.url);
      
      if (pathname === '/api/register') {
        return handleRegistration(request);
      }
      
      if (pathname === '/api/send-email') {
        return handleEmail(request);
      }
    }
    
    return new Response('Not Found', { status: 404 });
  }
};

async function handleRegistration(request) {
  const body = await request.json();
  // Registration logic here
  return new Response(JSON.stringify({ message: 'Registration successful' }), {
    headers: { 'Content-Type': 'application/json' }
  });
}

async function handleEmail(request) {
  const body = await request.json();
  // Email sending logic here
  return new Response(JSON.stringify({ message: 'Email sent successfully' }), {
    headers: { 'Content-Type': 'application/json' }
  });
} 