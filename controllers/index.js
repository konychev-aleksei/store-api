import express from "express";
import mongoose from "mongoose";

import User from "../models/User.js";
import Product from "../models/Product.js";
import Order from "../models/Order.js";

export const createUser = async (req, res) => {
  const { name } = req.params;
  try {
    const newUser = new User({
      _id: name,
      orders: [],
    });

    const user = await User.findById(name);

    if (!user) {
      await newUser.save();
    }

    res.status(200).json("User is created");
  } catch (e) {
    res.status(409).json({ message: e });
  }
};

export const createOrder = async (req, res) => {
  const { products, user } = req.body;
  try {
    const newOrder = new Order({
      user,
      products,
    });

    await newOrder.save();

    res.status(200).json("Order is created");
  } catch (e) {
    res.status(400).json({ message: e });
  }
};

export const getOrders = async (req, res) => {
  const { name } = req.params;
  try {
    const orders = await Order.find({ user: name });

    res.status(200).json(orders);
  } catch (e) {
    res.status(400).json({ message: e });
  }
};

export const getOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findById(id);

    res.status(200).json(order);
  } catch (e) {
    res.status(400).json({ message: e });
  }
};

export const querySearch = async (req, res) => {
  const { query } = req.params;

  try {
    const products = await Product.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
      ],
    });

    res.status(200).json(products);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};

//special POST request
export const uploadProducts = async (req, res) => {
  const { products } = req.body;

  try {
    await Promise.all(
      products.map(async ({ image, name, description, price }) => {
        const product = new Product({
          image,
          name,
          description,
          price,
        });
        await product.save();
      })
    );
    res.status(200).json("Products are uploaded");
  } catch (e) {
    console.error(e);
  }
};
