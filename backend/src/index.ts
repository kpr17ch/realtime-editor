import express, { Application, Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import documentRoutes from './routes/documentRoutes';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes';
import { protect } from './middleware/authMiddleware';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error('Missing MONGO_URI environment variable');
  process.exit(1);
}

// Middleware
app.use(cors());
app.use(express.json());

// Routen
app.use('/api/documents', documentRoutes);
app.use('/api/users', userRoutes);

// Beispielroute
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, World!');
});

// MongoDB Verbindung
mongoose.connect(MONGO_URI).then(() => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch((err) => {
  console.error('Database connection error:', err);
});
