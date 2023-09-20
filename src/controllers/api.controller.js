const Employee = require('../models/employee.model');

const addEmployee = async (req, res) => {
    const { firstName, lastName, department } = req.body;
    if (!firstName || !firstName.trim() || !lastName || !lastName.trim() || !department || !department.trim())
        return res.status(400).send({ statusCode: 400, statusMessage: 'Bad Request', message: null, data: null });
    console.log("xxx")

    try {
        const employee = new Employee(firstName, lastName, department);
        console.log("xxx")

        await employee.add();
        console.log("xxx")

        res.status(201).send({
            statusCode: 201,
            statusMessage: 'Created',
            message: 'Successfully created a user.',
            data: null,
        });
    } catch (err) {
        res.status(500).send({
            statusCode: 500,
            statusMessage: 'Internal Server Error',
            message: null,
            data: null,
        });
    }
};

const getEmployees = async (req, res) => {
    try {
        const employees = await Employee.find();

        res.send({
            statusCode: 200,
            statusMessage: 'Ok',
            message: 'Successfully retrieved all the Employees.',
            data: employees,
        });
    } catch (err) {
        res.status(500).send({ statusCode: 500, statusMessage: 'Internal Server Error', message: null, data: null });
    }
};



const filterEmplyeesByCreationDate = async (req, res) => {
    const { dateCreated } = req.body;
    if (!dateCreated || !dateCreated.trim())
        return res.status(400).send({ statusCode: 400, statusMessage: 'Bad Request', message: null, data: null });

    try {
        const employees = await Employee.filterEmployeesByCreationDate(req.body);

        return res.status(202).send({
            statusCode: 202,
            statusMessage: 'Accepted',
            message: 'Successfully updated a user.',
            data: employees,
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({
            statusCode: 500,
            statusMessage: 'Internal Server Error',
            message: null,
            data: null,
        });
    }
};

const checkIn = async (req, res) => {
    const { employee_id } = req.body;

    if (!employee_id || !employee_id.trim())
        return res.status(400).send({ statusCode: 400, statusMessage: 'Bad Request', message: null, data: null });

    try {
        await Employee.checkIn(req.body);

        res.send({
            statusCode: 200,
            statusMessage: 'Ok',
            message: 'Successfully updated checkIn.',
            data: null,
        });
    } catch (err) {
        res.status(500).send({
            statusCode: 500,
            statusMessage: 'Internal Server Error',
            message: null,
            data: null,
        });
    }
};

const checkOut = async (req, res) => {
    const { employee_id } = req.body;

    if (!employee_id || !employee_id.trim())
        return res.status(400).send({ statusCode: 400, statusMessage: 'Bad Request', message: null, data: null });

    try {
        const employee = await Employee.checkOut(req.body);

        res.send({
            statusCode: 200,
            statusMessage: 'Ok',
            message: 'Successfully deleted a user.',
            data: employee,
        });
    } catch (err) {
        res.status(500).send({
            statusCode: 500,
            statusMessage: 'Internal Server Error',
            message: null,
            data: null,
        });
    }
};

module.exports = {
    addEmployee,
    getEmployees,
    filterEmplyeesByCreationDate,
    checkIn,
    checkOut
};