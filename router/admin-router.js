const express = require("express");
const {getAllUsers, getAllContacts, deleteUserById, getUserById, updateUserById, deleteContactById} = require("../controllers/admin-controller");
const router = express.Router();
const authMiddleware =require("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/admin-middleware");

router.route("/users").get(authMiddleware, adminMiddleware, getAllUsers);
router.route("/users/:id").get(authMiddleware, adminMiddleware, getUserById);
router.route("/users/update/:id").patch(authMiddleware, adminMiddleware, updateUserById);
router.route("/users/delete/:id").delete(authMiddleware, adminMiddleware, deleteUserById);
router.route("/contacts/delete/:id").delete(authMiddleware, adminMiddleware, deleteContactById);
router.route("/contacts").get(authMiddleware, adminMiddleware, getAllContacts);

module.exports = router;
