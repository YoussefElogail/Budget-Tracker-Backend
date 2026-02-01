const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const morgan = require("morgan");

const ApiError = require("./util/ApiError");
const routes = require("./routes/index.route");

dotenv.config({ path: "./config.env" });

mongoose
  .connect(process.env.DB_URI)
  .then(() => console.log("MongoDB connected"));

const app = express();

app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

routes(app);

app.all(/.*/, (req, res, next) => {
  next(
    new ApiError(`Can't find ${req.originalUrl} on this server!`, 404, "fail"),
  );
});

app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stack: process.env.NODE_ENV === "development" && err.stack,
    error: process.env.NODE_ENV === "development" && err,
  });
});

const server = app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

process.on("unhandledRejection", (err) => {
  console.log(`Unhandled Rejection Error: ${err.name} | ${err.message}`);
  console.log(err);
  server.close(() => {
    console.log("Server closed. Process exiting...");
    process.exit(1);
  });
});
