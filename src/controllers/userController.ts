import { Request, Response } from "express";
const User = require("../models/user-model");
const createToken = require("../utils/createToken");
const { invalidateToken } = require("../utils/invalidateToken");

const registerUser = async (req: Request, res: Response) => {
  const user = await User.insert(req.body);
  delete user.password;
  const token = await createToken(user);

  return res.status(201).json({ user, token });
};

const getUser = async (req: Request, res: Response) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return res.status(404).json({
      message: "User not found.",
    });
  }
  return res.status(200).json(user);
};

const editUser = async (req: Request, res: Response) => {
  const edit = {
    username: req.body.username,
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    avatarUrl: req.body.avatarUrl,
  };
  const user = await User.update(edit, req.params.id);
  delete user.password;
  return res.status(200).json(user);
};

const deleteUser = async (req: Request, res: Response) => {
  await User.remove(req.params.id);
  return res.status(200).json({ message: "✌ Goodbye friend." });
};

const loginUser = async (req: Request, res: Response) => {
  // console.log(req.user);
  delete req.user.password;
  const token = await createToken(req.user);
  return res.status(200).json({ user: req.user, token });
};

const logoutUser = async (req: Request, res: Response) => {
  const token = invalidateToken();
  return res.status(200).json({ message: "✌ See ya later", token });
};

export { registerUser, getUser, editUser, deleteUser, loginUser, logoutUser };
