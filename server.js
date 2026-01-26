const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const morgan = require("morgan");

const incomeCategoriesRoute = require("./routes/IncomeCategory.route");
const expenseCategoriesRoute = require("./routes/expenseCategory.route");
const userRoute = require("./routes/user.route");
const authRoute = require("./routes/auth.route");
const walletRoute = require("./routes/wallet.route");
const expenseRoute = require("./routes/expense.route");

const ApiError = require("./util/ApiError");

dotenv.config({ path: "./config.env" });

mongoose
  .connect(process.env.DB_URI)
  .then(() => console.log("MongoDB connected"));

const app = express();

app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.get("/", (req, res) => {
  res.send(`<h1>hello to Budget Tracker app</h1>`);
});

app.use("/api/v1/income-categories", incomeCategoriesRoute);
app.use("/api/v1/expense-categories", expenseCategoriesRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/wallets", walletRoute);
app.use("/api/v1/expenses", expenseRoute);

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
    stack: err.stack,
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
