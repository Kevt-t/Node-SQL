import express from 'express';
import 'dotenv';
import cookieParser from 'cookie-parser'; // Import cookie-parser
import sequelize from './config/database.js'; // Database connection
import userRoutes from './routes/userRoutes.js'; // Router for user routes
import recipeRoutes from './routes/recipeRoutes.js'; //Router for recipes routes
import './models/associations.js'; // Import associations to ensure all relationships are set up
import authenticateToken from './middleware/authMiddleware.js'; // Import authentication middleware


import path from 'path';
import { fileURLToPath } from 'url'