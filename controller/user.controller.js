import { createUser, getUserById } from "../models/user.model.js";

export const createNewUser = async (req, res) => {
  
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: "All credentials are required" });
    }

    const user = await createUser(name, email);

    return res
      .status(201)
      .json({ message: "User created successfully", user });

  } catch (err) {
    console.error("Error creating user:", err.message);
    return res.status(500).json({ message: "Server error" });
  }
};


export const getUser = async (req, res) => {

  try {
    const { id } = req.params;

    const user = await getUserById(id);

    if (!user) return res.status(404).json({ error: "User not found" });

    return res.status(200).json(user);

  } catch (err) {
    console.error("Error fetching user:", err.message);
    return res.status(500).json({ message: "Server error" });
  }

};
