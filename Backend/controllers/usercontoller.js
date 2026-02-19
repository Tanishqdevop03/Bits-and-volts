import User from "../models/User.js";
import {convertToCSV} from "../utils/csvexporter.js";

export const createUser = async (req, res, next) => {
  try {
    const userData = req.body;
    if (req.file) {
      userData.profileImage = `/public/uploads/${req.file.filename}`;
    }
    const user = await User.create(userData);
    res.status(201).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

export const getUsers = async (req, res, next) => {
    try {
        const { page = 1, limit = 5, search = "" } = req.query;

        const query = {
        $or: [
            { firstName: { $regex: search, $options: "i" } },
            { lastName: { $regex: search, $options: "i" } },
            { email: { $regex: search, $options: "i" } },
            {gender: { $regex: search, $options: "i" } },
            {status: { $regex: search, $options: "i" } },
            {profileImage: { $regex: search, $options: "i" } },
        ],
        };

        const users = await User.find(query)
        .skip((page - 1) * limit)
        .limit(parseInt(limit));

        const total = await User.countDocuments(query);

        res.json({
        success: true,
        data: users,
        total,
        page: Number(page),
        });
    } catch (error) {
        next(error);
    }
};

export const getUserById = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json({ success: true, data: user });
    } catch (error) {
        next(error);
    }
};

export const updateUser = async(req, res, next) => {
    try {
        const userData = req.body;
        if (req.file) {
          userData.profileImage = `/public/uploads/${req.file.filename}`;
        }
        const user = await User.findByIdAndUpdate(req.params.id, userData, {
        new: true,
        runValidators: true,
        });
        res.json({ success: true, data: user });
    } catch (error) {
        next(error);
    }
};

export const deleteUser = async(req, res, next) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: "User deleted" });
    } catch (error) {
        next(error);
    }
};

export const exportUsersToCSV = async (req, res, next) => {
    try {
        const users = await User.find();
        const csv = convertToCSV(users);

        res.header("Content-Type", "text/csv");
        res.attachment("users.csv");
        return res.send(csv);
    } catch (error) {
        next(error);
    }
}


