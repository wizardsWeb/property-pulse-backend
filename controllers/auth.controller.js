import bcrypt from 'bcrypt';
import prisma from '../lib/prisma.js';

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
        
        // CHECK IF THE PASSWORD IS CORRECT
        
        // GENERATE A COOKIE TOKEN AND SEND TO THE USER

    }
    catch (error) {
        console.log(error);
        res.status(500).json({message: 'Failed to login!'})
    }

}

export const logout = (req, res) => {
    // db Operations
}