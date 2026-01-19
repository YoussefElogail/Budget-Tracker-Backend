const asyncHandler = require("express-async-handler");
const { STATUS_CODE, STATUS } = require("../util/constants");

const createOne = (Model, modelName = "") =>
  asyncHandler(async (req, res) => {
    const model = await Model.create(req.body);
    res.status(STATUS_CODE.CREATED).json({
      status: STATUS.SUCCESS,
      message: `${modelName} is created successfully`,
      data: model,
    });
  });

const getAll = (Model, modelName = "") =>
  asyncHandler(async (req, res) => {
    const model = await Model.find();
    res.status(STATUS_CODE.SUCCESS).json({
      status: STATUS.SUCCESS,
      data: model,
    });
  });

const getOne = (Model, modelName = "") =>
  asyncHandler(async (req, res) => {
    const model = await Model.findById(req.params.id);
    res.status(STATUS_CODE.SUCCESS).json({
      status: STATUS.SUCCESS,
      data: model,
    });
  });

const updateOne = (Model, modelName = "") =>
  asyncHandler(async (req, res) => {
    const model = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(STATUS_CODE.CREATED).json({
      status: STATUS.SUCCESS,
      data: model,
      message: `${modelName} is update successfully`,
    });
  });

const deleteOne = (Model, modelName = "") =>
  asyncHandler(async (req, res) => {
    await Model.findByIdAndDelete(req.params.id);
    res.status(STATUS_CODE.SUCCESS).json({
      status: STATUS.SUCCESS,
      data: null,
      message: `${modelName} is delete successfully`,
    });
  });

module.exports = {
  createOne,
  getAll,
  getOne,
  updateOne,
  deleteOne,
};
