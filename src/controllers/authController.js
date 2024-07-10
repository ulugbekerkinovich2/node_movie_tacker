const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const otpGenerator = require('otp-generator');
const emailService = require('../services/emailService');
const authService = require('../services/authService');
const { loginSchema, registerSchema, otpSchema } = require('../validations/authValidation');
const validateSchema = require('../middlewares/validateMiddleware');
const client = require('../utils/connect-redis');
const prisma = new PrismaClient();



const register = async (req, res) => {
    const { error } = validateSchema(registerSchema, req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const { fullname, email, password } = req.body;

    try {
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) return res.status(400).json({ message: 'User already exists' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await prisma.user.create({
            data: { fullname, email, password: hashedPassword },
        });

        const otp = otpGenerator.generate(6, { upperCase: false, specialChars: false, digits: true });
        const expiresAt = Date.now() + 60000;

        await client.set(email, JSON.stringify({ otp, expiresAt }), 'EX', 60000 / 1000);

        await emailService.sendOtp(email, otp);

        res.status(201).json({ message: 'User registered, check your email for OTP' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const verifyOtp = async (req, res) => {
    const { error } = validateSchema(otpSchema, req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const { email, otp } = req.body;

    try {
        const data = await client.get(email);
        if (!data) return res.status(400).json({ message: 'OTP not requested' });
        const { otp: storedOtp, expiresAt } = JSON.parse(data);
        if (otp !== storedOtp || Date.now() > expiresAt) {
            return res.status(400).json({ message: 'Invalid or expired OTP' });
        }

        await client.del(email)

        await prisma.user.update({
            where: { email },
            data: { verified: true },
        })
        res.json({ message: 'OTP verified' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const login = async (req, res) => {
    const { error } = validateSchema(loginSchema, req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const { email, password } = req.body;

    try {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) return res.status(400).json({ message: 'Invalid email or password' });

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(400).json({ message: 'Invalid email or password' });
        if (user.verified === false) return res.status(400).json({ message: 'Please verify your email' });
        const token = authService.generateToken(user);

        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    register,
    verifyOtp,
    login,
};
