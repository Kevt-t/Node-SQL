// Import necessary modules
import { DataTypes } from 'sequelize'; // Import DataTypes from sequelize for defining model attributes
import sequelize from '../config/db.js'; // Import the sequelize instance configured for the database
import bcrypt from 'bcrypt'; // Import bcrypt for password hashing

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER, // Auto-incremented integer
        primaryKey: true, // Set as the primary key
        autoIncrement: true, // Automatically incremented
        allowNull: false, // Cannot be null
    },
    // Define the username attribute
    username: {
        type: DataTypes.STRING, // Username must be a string
        allowNull: false, // There must be a username
        unique: true, // Username must be unique
        validate: {
            isAlphanumeric: true, // Ensures only letters and numbers (no spaces or special characters)
            len: [3, 30], // Minimum 3 characters, maximum 30 characters
        },
        set(value) {
            this.setDataValue('username', value.toLowerCase()); // Always save in lowercase
        },
    },
    // Define the email attribute
    email: {
        type: DataTypes.STRING, // Set the data type to STRING
        allowNull: false, // This field cannot be null
        unique: true, // This field must be unique across all users
        validate: {
            isEmail: true, // Ensure the email format is valid
        },
    },
    // Password field
    password: {
        type: DataTypes.STRING, // Set password as a string
        allowNull: false, // Password is required
        validate: {
            len: [8, 100], // Minimum 8 characters, maximum 100 characters
        },
    },
    // Define the profile picture attribute
    profilePicture: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: '/assets/defaultProfilePicture', // Replace with your default image URL
        validate: {
            isUrl: true,
        },
    },
    // Define the bio attribute
    bio: {
        type: DataTypes.TEXT, // Allows for longer strings (multi-line text)
        allowNull: true, // Optional field
        validate: {
            len: [0, 500], // Optional: Limit the bio to a maximum of 500 characters
        },
    },
    timestamps: true, // Automatically add createdAt and updatedAt fields
});

// Hook for hashing the password before saving a new user
User.beforeCreate(async (user) => {
    // Generate a salt for hashing
    const salt = await bcrypt.genSalt(10);
    // Hash the user's password with the generated salt
    user.password = await bcrypt.hash(user.password, salt);
  });
  
// Instance method for validating the password
User.prototype.checkPassword = async function (password) {
// Compare the provided password with the hashed password stored in the database
    return bcrypt.compare(password, this.password);
};

// Export the User model
export default User;