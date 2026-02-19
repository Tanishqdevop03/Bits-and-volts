import express from 'express';
import { createUser, deleteUser, exportUsersToCSV, getUserById, getUsers, updateUser } from '../controllers/usercontoller.js';
import upload from '../middlewares/upload.js';

const router = express.Router();
router.post("/", upload.single("profileImage"), createUser)
router.get("/", getUsers);
router.get("/export/csv", exportUsersToCSV);
router.get("/:id", getUserById);
router.put("/:id", upload.single("profileImage"), updateUser);
router.delete("/:id", deleteUser);

export default router;
