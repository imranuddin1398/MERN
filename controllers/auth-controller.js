const User = require("../models/user-models")
const bcrypt = require('bcryptjs');

const home = async (req, res) => {
    try {
        res.status(200).json({msg:"Welcome to Mern2024"});
    } catch (error) {
        console.error("Error in home route:", error);
        res.status(500).json("Internal Server Error");
    }
};

const register = async (req, res) => {
    try {
        //console.log(req.body);
        const { username, email, phone, password } = req.body;
        const userExist = await User.findOne({ email: email });

        if (userExist) {
            return res.status(400).json({message: "Email already exists"});
        }

        // const saltRound = 10;
        // const hash_password = await bcrypt.hash(password, saltRound);
        const userCreated = await User.create({ username, email, phone, password });
        res.status(201).json({
            message: "Registration successful",
            token: await userCreated.generateToken(),
            userId: userCreated._id.toString(),
        });

    } catch (error) {
        console.error("Error in register route:", error);
        res.status(500).json({message:"Error internal server"});
    }
};

const login = async (req, res) => {
    try {
        //console.log(req.body);
        const { email, password } = req.body;
        const userExist = await User.findOne({ email });
        console.log(userExist);

        if (!userExist) {
            return res.status(400).json({message: "Invalid Credentials"});
        }

        //const isPasswordValid = await bcrypt.compare(password, userExist.password);
        const isPasswordValid = await userExist.comparePassword(password);

        if (isPasswordValid) {
            res.status(200).json({
                message: "Login successful",
                token: await userExist.generateToken(),
                userId: userExist._id.toString(),
            });
        } else {
            res.status(401).json({ message: "Invalid email or password" });
        }

    } catch (error) {
        console.error("Error in register route:", error);
        res.status(500).json({message: "Error internal server"});
    }
};

const user = async (req, res) => {
    try {
      // const userData = await User.find({});
      const userData = req.user;
      console.log(userData);
      return res.status(200).json({ userData });
    } catch (error) {
      console.log(` error from user route ${error}`);
    }
  };

module.exports = { home, register, login, user };
