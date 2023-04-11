import User from "../models/user";
import bcrypt from "bcryptjs";
import { signupSchema, signinSchema } from "../schemas/auth"
import jwt from "jsonwebtoken";

export const signup = async(req, res) => {
    try {
        const { name, email, password } = req.body;
        const { error } = signupSchema.validate(req.body, { abortEarly: false });
        if (error) {
            const errors = error.details.map((err) => err.message);
            return res.status(400).json({
                message: errors,
            });
        }

        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({
                message: "Email da ton tai",
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
                name,
                email,
                password: hashedPassword
            })
            //Khong tra pass
        user.password = undefined;

        return res.status(201).json({
            message: "Dang ki thanh cong",
            user,
        });
    } catch (error) {
        return res.status(400).json({
            message: error,
        });

    }
};

//Dang nhap

//BUOC 1: VALIDATE GIA TRI TU CLIENT GUI LEN
export const signin = async(req, res) => {
    try {
        const { email, password } = req.body;
        const { error } = signinSchema.validate(req.body, { abortEarly: false });
        if (error) {
            const errors = error.details.map((err) => err.message);
            return res.status(400).json({
                message: errors,
            });
        }

        //BUOC 2: KIEM TRA USER CO TON TAI TRONG DB HAY KHONG? NEU KHONG CO THI TRA VE LOI
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Tai khoan khong ton tai",
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                message: "Mat khau hong dung",
            });
        }

        // BUOC 4: TAO TOKEN MOI VA TRA VE CLIENT CUNG THONG TIN USER
        const token = jwt.sign({ id: user._id }, "hehe", { expiresIn: "1d" });

        return res.status(200).json({
            message: "Dang nhap thanh cong",
            accessToken: token,
            user,

        });

    } catch (error) {

    }
};