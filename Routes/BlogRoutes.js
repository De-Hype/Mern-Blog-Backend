
const {getAllPost, 
    addPost, 
    updatePost, 
    deletePost, 
    getSinglePost } = require("../Controllers/BlogController");
const express = require('express')
const router = express.Router();


router.get("/all-post", getAllPost)
router.post("/add-post", addPost);
router.put("/update-post/:id", updatePost)
router.delete("/delete-post/:id", deletePost)
router.get("/post/:id", getSinglePost)
module.exports = router;