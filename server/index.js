import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";  // *enables your express application access control to allow restricted resources from being accessed from external domains 
import dotenv from "dotenv";
import multer from "multer";  //  *middleware for handling multipart/form-data , which is primarily used for uploading files
import helmet from "helmet";  //  *secures your express app by setting response HTTP headers appropriately
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import { register } from "./controllers/auth.js";
import { createPost } from "./controllers/posts.js"
import { verifyToken } from "./middleware/auth.js";
import User from "./models/User.js";
import Post from "./models/Post.js";
import { users, posts } from "./data/index.js";

// Configurations
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, 'public/assets')));

// Files Storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});
const upload = multer({ storage });

// Routes with Files
app.post("/auth/register", upload.single("picture"), register);
app.post("/posts", verifyToken, upload.single("picture"), createPost);

// Routes
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

// Mongoose Setup 
const PORT = process.env.PORT || 6001;
mongoose
  .connect(
    process.env.MONGO_URL
  ).then(() => {
    app.listen(PORT, () => {
      console.log("Connected to MongoDB!")
      console.log(`Hi Mom and Dad!!!\nLink\t:\thttp://localhost:${PORT}`);
    })

    // Add data one time
    // User.insertMany(users);
    // Post.insertMany(posts);
  }).catch((error) => {
    console.log(`${error}\nDid Not Connect!`);
  })
