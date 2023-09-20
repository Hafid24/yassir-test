const moment = require('moment');
const pool = require('../databases/mysql.db');

class Employee {
    constructor(firstName, lastName, department, comment = "") {
        this._firstName = firstName;
        this._lastName = lastName;
        this._department = department;
        this._comment = comment;
    }

    get firstName() {
        return this._firstName;
    }

    set firstName(firstName) {
        if (!firstName) throw new Error('Invalid first name value.');

        firstName = firstName.trim();
        if (firstName === '') throw new Error('Invalid first name value.');

        this._firstName = firstName;
    }

    get lastName() {
        return this._lastName;
    }

    set lastName(lastName) {
        if (!lastName) throw new Error('Invalid last name value.');

        lastName = lastName.trim();
        if (lastName === '') throw new Error('Invalid last name value.');

        this._lastName = lastName;
    }

    get department() {
        return this.department;
    }

    set department(department) {
        if (!department) throw new Error('Invalid last name value.');

        department = department.trim();
        if (department === '') throw new Error('Invalid last name value.');

        this._department = department;
    }


    async add() {
        console.log("here", this._firstName, this._lastName, this._department)
        const sql = `INSERT INTO employees (id,  lastName, firstName, dateCreated, department ) VALUES (LEFT(UUID(), 8) , "${this._lastName}", "${this._firstName}", CURRENT_DATE(), "${this._department}")`;
        console.log(sql)
        await pool.execute(sql);
    }



    static async find() {
        const sql = 'SELECT * FROM employees';
        const [rows, fields] = await pool.execute(sql);

        return rows;
    }

    static async filterEmployeesByCreationDate(dateCreated) {
        const _dateCreated = moment(dateCreated).format('YYYY-MM-DD')
        const sql = `SELECT * FROM employees WHERE dateCreated = "${_dateCreated}"`;
        const [rows, fields] = await pool.execute(sql);
        console.log(sql, rows)


        return rows;
    }


    static async checkIn(options) {
        const sql = `UPDATE employees SET comment = "${options.comment}" , checkIn = CURRENT_TIMESTAMP WHERE id = "${options.employee_id}"`;
        console.log(sql)
        return await pool.execute(sql);
    }

    static async checkOut(options) {
        const sql_id = `SELECT  checkIn FROM employees WHERE id = "${options.employee_id}"`;
        const [row, fields] = await pool.execute(sql_id);
        console.log(sql_id, row)
        try {
            const checkIn = new moment(row[0].checkIn);
            const checkOut = new moment(row[0].checkOut);
            const checkPeriod = (checkOut - checkIn) / 1000 / 3600; // Calculate difference 
            console.log(checkIn, checkOut, checkPeriod)

            const sql = `UPDATE employees SET comment = "${options.comment}" , checkOut = CURRENT_TIMESTAMP , checkPeriod = ROUND(${checkPeriod}) WHERE id = "${options.employee_id}"`;
            console.log(sql, "2222")

            await pool.execute(sql);
            console.log(sql, "1111")
        } catch {
            throw new Error("Employee didn't check in");
        }
    }


}

module.exports = Employee;