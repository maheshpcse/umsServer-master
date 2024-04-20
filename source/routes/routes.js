const express = require('express');
const router = express.Router();
const authUserCtrl = require('../controllers/authUser.controller');
const employeesCtrl = require('../controllers/employees.controller');

// Server routes
router.get('/server', (request, response, next) => {
    console.log("API works!");
    response.status(200).json({
        success: true,
        statusCode: 200,
        message: 'API works!'
    });
});

// Employee authentication routes
router.post('/login', authUserCtrl.userLogin);
router.post('/signup', authUserCtrl.userSignup);

// Manage Employee routes
router.post('/get_employees_data', employeesCtrl.getEmployeesData);
router.post('/add_employee_data', employeesCtrl.addOrUpdateEmployeeData);
router.put('/update_employee_data/:empId', employeesCtrl.addOrUpdateEmployeeData);
router.put('/update_employee_status/:empId', employeesCtrl.updateEmployeeStatus);
router.delete('/delete_employee_data/:empId', employeesCtrl.deleteEmployeeData);

module.exports = router;