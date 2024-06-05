import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js'; 
import peixeRoutes from './routes/peixeRoutes.js'; // Importe o router de peixes

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Adiciona as rotas ao aplicativo
app.use('/api/users', userRoutes);
app.use('/api/peixes', peixeRoutes); // Use o router de peixes

// Adicione este log para verificar se o servidor está ativo
app.listen(PORT, () => {
  console.log(`O servidor está ativo na porta ${PORT}`);
});
