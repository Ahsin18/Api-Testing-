
require('dotenv').config();

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/user');
const connectDB = require('./database');

async function createAdmin() {
    try {
        await connectDB();

        const email = 'admin07@gmail.com';
        const password = 'admin@2026';

        // Check if admin already exists
        const existingAdmin = await User.findOne({ email });

        if (existingAdmin) {
            console.log("Admin Account already Exists");
            return;
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create admin account
        await User.create({
            name: 'Admin',
            email,
            password: hashedPassword,
            role: 'admin'
        });

        console.log('Admin Created Successfully');
        console.log('Email:', email);

    } catch (error) {
        console.error('Admin Creation Failed:', error.message);

    } finally {
        await mongoose.disconnect();
    }
}

createAdmin();
