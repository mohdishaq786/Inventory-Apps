const express = require("express");
const cors = require("cors");

const inventoryRoutes = require("./Routes/inventoryRoutes");
const userRouter = require("./Routes/userRoutes");
const app = express();
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const path = require(path);
const { errorHandler, notFound } = require("./middleware/errorMiddleware");
dotenv.config();
//db conection
connectDB();

// Use the cors middleware with appropriate configuration if needed
app.use(cors());
app.use(express.json()); // to accept JSON data (check from Postman)

//route to controller
app.use("/api/grocery", inventoryRoutes);
//app  user
app.use("/api/users", userRouter);
//-----------------------------------------------------------------DEployment------------------------->
const __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/grocery-app/build")));

  app.get("*", (req, res) =>
    res.sendFile(
      path.resolve(__dirname, "frontend/grocery-app", "build", "index.html")
    )
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}
//-----------------------------------------------------------------DEployment------------------------->
const PORT = process.env.PORT || 5000;
// Error Handling middlewares
app.use(notFound);
app.use(errorHandler);
//methode
//server
app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}..`
  )
);
