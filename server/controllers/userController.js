import bcrypt from "bcryptjs";
import { User } from "../modules/userModal.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  console.log(req, "wefjbwewefeeeee");
  try {
    const { fullName, userName, password, confirmpassword, gender } = req.body;
    console.log(fullName, userName, "wefjbwewef");

    if (!fullName || !userName || !password || !confirmpassword || !gender) {
      return res.status(400).json({ message: "All fields are required." });
    }
    if (password !== confirmpassword) {
      return res
        .status(400)
        .json({ message: "Password do not matched with confirm password" });
    }
    const user = await User.findOne({ userName });

    console.log(user, "user");

    if (user) {
      return res
        .status(400)
        .json({ message: "Username already exist try different username." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const malePic = `https://avatar.iran.liara.run/public/boy?username=${userName}`;
    const femalePic = `https://avatar.iran.liara.run/public/girl?username=${userName}`;
    await User.create({
      fullName,
      userName,
      password: hashedPassword,
      gender,
      profilePhoto: gender === "male" ? malePic : femalePic,
    });

    return res.status(200).json({ message: "User Created Successfully" });
  } catch (error) {
    console.log(error, "error");
  }
};

export const login = async (req, res) => {
  try {
    const { userName, password } = req.body;
    if (!userName || !password) {
      return res.status(400).json({ message: "ALL Fields are required." });
    }
    const user = await User.findOne({ userName });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Incorrect username or password", success: false });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res
        .status(400)
        .json({ message: "Incorrect  password", success: false });
    }

    const tokenPayload = {
      userID: user._id,
    };

    const token = await jwt.sign(tokenPayload, process.env.JWT_SECRETKEY, {
      expiresIn: "2d",
    });
    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
      })
      .json({
        _id: user._id,
        username: user.userName,
        fullname: user.fullName,
        profilephoto: user.profilePhoto,
      });
  } catch (error) {
    console.log(error, "error");
  }
};

export const logout = (req, res) => {
  try {
    return res
      .status(200)
      .cookie("token", "", { maxAge: 0 })
      .json({ message: "user loged out successfully" });
  } catch (error) {
    console.log(error, "error");
  }
};

export const getOtherUsers = async (req, res) => {
  try {
    console.log(req, "wekjfnkwjf");
    const loggerID = req.id;
    const otherUser = await User.find({ _id: { $ne: loggerID } }).select(
      "-password"
    );

    console.log(otherUser, "otherUser");

    return res.status(200).json(otherUser);
  } catch (error) {
    console.log(error, "error");
  }
};
