const express = require('express');
const User = require('../models/user.model');
const { generateToken } = require('../services/authService');
const bcrypt = require('bcrypt');
const { Op } = require('sequelize');

exports.getUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.findMe = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ where: { username: username }});
        if (user && await bcrypt.compare(password, user.password)) {
            const token = generateToken(user);
            res.json({ token });
        } else {
            return res.status(401).send('Info Mauvaises');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.registerMe = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const userExists = await User.findOne({
            where: {
                [Op.or]: [
                    { username: username },
                    { email: email }
                ]
            }
        });
        if (userExists) {
            return res.status(400).send('Utilisateur ou email déjà utilisé');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword
        });

        const token = generateToken(newUser);

        res.status(201).json({ newUser, token });
    } catch (error) {
        res.status(500).send(error.message);
    }
};
