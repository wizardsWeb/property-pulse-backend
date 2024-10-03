import bcrypt from 'bcrypt';
import prisma from '../lib/prisma.js';
import jwt from 'jsonwebtoken';

export const signup = async (req, res) => {
    
    const { username, email, password } = req.body;

    try {
        // HASH PASSWORD
        const hashedPassword = await bcrypt.hashSync(password, 10);
        
        // CREATE A NEW USER AND SAVE TO DB
        const newUser = await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword,
            }
        })
        
        res.status(201).json({ message: 'User created successfully' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating user' });
    }


}

export const login = async (req, res) => {
    
    const { username, password } = req.body;

    try {

        const user = await prisma.user.findUnique({
            where: {
                username
            }
        })

        
        // CHECK IF THE USER EXISTS
        if(!user) return res.status(401).json({message: "Invalid Credentails"});

        
        // CHECK IF THE PASSWORD IS CORRECT
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if(!isPasswordValid) return res.status(401).json({ message: "Invalid Credentials" });
        
        // GENERATE A COOKIE TOKEN AND SEND TO THE USER

        // this is much easier to read so we will not use this
        // res.setHeader('Set-Cookie', "test=" + "myValue").json("Success");

        const age = 1000 * 60 * 60 * 24 * 7; // 7 days

        const token = jwt.sign({
            id: user.id,
            isAdmin: false
        }, process.env.JWT_SECRET_KEY, { expiresIn: age })

        const {password: userPassword , ...userInfo} = user

        res.cookie('token', token, {
            httpOnly: true,
            // secure: true, // in the production mode
            maxAge: age
        }).status(200).json({ userInfo })

    }
    catch (error) {
        console.log(error);
        res.status(500).json({message: 'Failed to login!'})
    }

}

export const logout = (req, res) => {
    
    res.clearCookie('token').status(200).json({message: "Logout Successful"})

}