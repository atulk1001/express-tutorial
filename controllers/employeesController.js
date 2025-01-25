const data = {};
data.employess = require("../model/employees.json");

const getAllEmployees = (req, res) => {
  res.json(data.employess);
};

const createNewEmployee = (req, res) => {
  const newEmployee = {
    id: data.employess[data.employess.length - 1].id + 1,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  };
  data.employess.push(newEmployee);
  res.status(201).json(data.employess);
};

const updateEmployee = (req, res) => {
  res.json({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  });
};

const deleteEmployee = (req, res) => {
  res.json({
    id: req.body.id,
  });
};

const getEmployee = (req, res) => {
  res.json({ id: req.params.id });
};

module.exports = {
  getAllEmployees,
  createNewEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployee,
};
