const User = require("../models/user-models");
const Contact = require("../models/contact-models");

const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find({}, {password:0});
        console.log(users);
        if(!users || users.length === 0){
            return res.status(404).json({ message: "No Users Found"});    
        }
        return res.status(200).json(users);
    } catch (error) {
        next(error);
    }
};

const deleteUserById = async (req, res, next) => {
    try {
        const id = await req.params.id;
        console.log(id);
        await User.deleteOne({ _id: id });
        return res.status(200).json({ message: "User Deleted Sucessfully"});
    } catch (error) {
        next(error);
    }
};
const deleteContactById = async (req, res, next) => {
    try {
        const id = await req.params.id;
        console.log(id);
        await Contact.deleteOne({ _id: id });
        return res.status(200).json({ message: "Contact Deleted Sucessfully"});
    } catch (error) {
        next(error);
    }
};

const updateUserById = async (req, res, next) => {
    try {
        const id = await req.params.id;
        console.log(id);
        const updateUserData = req.body;
        const updateUser = await User.updateOne({ _id:id }, { $set: updateUserData,});
        return res.status(200).json(updateUser);
    } catch (error) {
        next(error);
    }
};

const getUserById = async (req, res, next) => {
    try {
        const id = await req.params.id;
        console.log(id);
        const data = await User.findOne({ _id: id }, {password:0});
        return res.status(200).json(data);
    } catch (error) {
        next(error);
    }
};

const getAllContacts = async (req, res, next) => {
    try {
        const contacts = await Contact.find();
        console.log(contacts);
        if(!contacts || contacts.length === 0){
            return res.status(404).json({ message: "No Contacts Found"});    
        }
        return res.status(200).json(contacts);
    } catch (error) {
        next(error);
    }
};
module.exports = {getAllUsers, getAllContacts, deleteUserById, getUserById, updateUserById, deleteContactById};