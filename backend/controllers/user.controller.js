import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

export const register = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, password, role } = req.body;

        if (!fullname || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({
                message: "All fields are required",
                success: false
            });
        }

        const file = req.file;
        if (!file) {
            return res.status(400).json({
                message: "Profile image is required",
                success: false
            });
        }

        const fileUri = getDataUri(file);
        if (!fileUri) {
            return res.status(400).json({
                message: "File processing failed",
                success: false
            });
        }
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "User already exists with this email",
                success: false
            });
        }


        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
            role,
            profile: {
                profilePhoto: cloudResponse.secure_url,
            }
        });

        return res.status(201).json({
            message: "Account created successfully",
            success: true
        });

    } catch (error) {
        console.log("REGISTER ERROR:", error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        if (!email || !password || !role) {
            return res.status(400).json({
                message: "All fields are required",
                success: false
            });
        }

        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Invalid email or password",
                success: false
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid email or password",
                success: false
            });
        }

        if (role !== user.role) {
            return res.status(400).json({
                message: "Invalid role",
                success: false
            });
        }

        const token = jwt.sign(
            { userId: user._id },
            process.env.SECRET_KEY,
            { expiresIn: "1d" }
        );

        // remove sensitive data
        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        };

        return res
            .status(200)
            .cookie("token", token, {
                maxAge: 1 * 24 * 60 * 60 * 1000,
                httpOnly: true,
                sameSite: "strict"
            })
            .json({
                message: `Welcome back ${user.fullname}`,
                user,
                success: true
            });

    } catch (error) {
        console.log("LOGIN ERROR:", error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};


export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "Logged out successfully",
            success: true
        });
    } catch (error) {
        console.log("LOGOUT ERROR:", error);
    }
};


export const updateProfile = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, bio, skills } = req.body;

        const userId = req.user.id;
        let user = await User.findById(userId);

        if (!user) {
            return res.status(400).json({
                message: "User not found",
                success: false
            });
        }


        if (fullname) user.fullname = fullname;
        if (email) user.email = email;
        if (phoneNumber) user.phoneNumber = phoneNumber;
        if (bio) user.profile.bio = bio;

        if (skills) {
            user.profile.skills = skills.split(",");
        }

       if (req.file) {
    const fileUri = getDataUri(req.file);

    if (fileUri) {
        const cloudResponse = await cloudinary.uploader.upload(
            fileUri.content,
            {
                resource_type: "raw"
            }
        );

        user.profile.resume = cloudResponse.secure_url;
        user.profile.resumeOriginalName = req.file.originalname;
    }
}

        await user.save();

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        };

        return res.status(200).json({
            message: "Profile updated successfully",
            user,
            success: true
        });

    } catch (error) {
        console.log("UPDATE PROFILE ERROR:", error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};
import { predictRole } from "../ai/predictRole.js";
import { readResumeFromUrl } from "../ai/resumeReader.js";
//import { User } from "../models/user.model.js";
import { findMatchingJobs } from "../ai/findMatchingJobs.js";
export const testResumeReader = async (req, res) => {
    try {
        const user = await User.findById(req.id);

        if (!user?.profile?.resume) {
            return res.status(400).json({
                success: false,
                message: "Resume not found"
            });
        }

        console.log("Resume URL:", user.profile.resume);

       const resumeText = await readResumeFromUrl(
    user.profile.resume
);
 const role = await predictRole(resumeText);
console.log("Predicted Role:", role);
// return res.status(200).json({
// success: true,
// predictedRole: role,
// text: resumeText.substring(0, 1000)
// });
const jobs = await findMatchingJobs(role);

console.log("Jobs Found:", jobs.length);
return res.status(200).json({
    success: true,
    predictedRole: role,
    jobsFound: jobs.length,
    jobs: jobs.map(job => ({
        title: job.title,
        company: job.company?.name
    }))
});
    } catch (error) {
        console.log("TEST RESUME ERROR:", error);
        console.log("FULL ERROR:");
        console.log(error.response?.status);
        console.log(error.response?.data);
        console.log(error.message);


        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};