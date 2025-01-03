import app from './server.js';

const port = process.env.PORT || 3001;

const server = app.listen(port, () => {
  console.log(`API server running on port ${port}`);
});

server.on('error', (error) => {
  console.error('API Server error:', error);
});

export default app;