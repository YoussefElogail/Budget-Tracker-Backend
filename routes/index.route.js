const incomeCategoriesRoute = require("../routes/IncomeCategory.route");
const expenseCategoriesRoute = require("../routes/expenseCategory.route");
const userRoute = require("../routes/user.route");
const authRoute = require("../routes/auth.route");
const walletRoute = require("../routes/wallet.route");
const expenseRoute = require("../routes/expense.route");
const incomeRoute = require("../routes/income.route");

const routes = (app) => {
  app.get("/", (req, res) => {
    res.send(`<h1>hello to Budget Tracker app</h1>`);
  });

  app.use("/api/v1/income-categories", incomeCategoriesRoute);
  app.use("/api/v1/expense-categories", expenseCategoriesRoute);
  app.use("/api/v1/users", userRoute);
  app.use("/api/v1/auth", authRoute);
  app.use("/api/v1/wallets", walletRoute);
  app.use("/api/v1/expenses", expenseRoute);
  app.use("/api/v1/incomes", incomeRoute);
};

module.exports = routes;
