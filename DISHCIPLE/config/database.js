import { Sequelize } from 'sequelize'; // Sequelize <3
import 'dotenv/config'; // Need them environment variables

// Use that import for a purpose
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host:process.env.DB_HOST,
        dialect:process.env.DB_DIALECT,
        logging:false, //disable verbose logging in production for cleaner output
    }
);

export default sequelize;

