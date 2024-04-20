const { raw } = require('objection');
const moment = require('moment');
const _ = require('underscore');
const bcrypt = require('bcrypt');
const fs = require('fs');
const config = require('../config/config');
const Employees = require('../models/Employees.model');
const Users = require('../models/Users.model');

// Get employees list - POST METHOD
const getEmployeesData = async (request, response, next) => {
    console.log('In getEmployeesData(), request body isss', request.body);
    let result = {};
    let employeesList = [];
    let message = '';
    try {
        // SELECT LIST query
        await Employees.query(request.knex)
            .select('e.*')
            .alias('e')
            .whereRaw(`e.createdBy = ${request.body.userId}`)
            .then(async list => {
                console.log('Get employees list response', list);
                employeesList = list;
            }).catch(getListErr => {
                message = 'Error while getting employees list';
                throw getListErr;
            });

        result = {
            success: true,
            error: false,
            statusCode: 200,
            message: 'Ger employees list successful',
            data: employeesList
        }
    } catch (error) {
        console.log('Error at try catch API result', error);
        result = {
            success: false,
            error: true,
            statusCode: 500,
            message: message || 'Error at try catch API result',
            data: []
        }
    }
    return response.status(200).json(result);
}

// Add or Update employee - POST METHOD for add employee and PUT METHOD for update employee
const addOrUpdateEmployeeData = async (request, response, next) => {
    console.log('In addOrUpdateEmployeeData(), request body isss', request.body);
    let result = {};
    let message = '';
    try {
        let { empId } = request.params;

        // start transaction to insert/update employee
        await Employees.transaction(async trx => {

            if (!empId) {
                request.body['empId'] = null;
                request.body['createdAt'] = moment().format('YYYY-MM-DD HH:mm:ss');
                console.log('final insert employee data isss:', request.body);
                await Employees.query(request.knex).insert(request.body).transacting(trx).then(async result => {
                    console.log('Get added employee result isss', result);
                }).catch(insertErr => {
                    message = message || 'Error while inserting new employee';
                    throw insertErr;
                });
            } else {
                request.body['empId'] = Number(empId);
                console.log('final update employee data isss:', request.body);
                await Employees.query(request.knex)
                    .update(request.body)
                    .whereRaw(`empId = ${Number(empId)}`)
                    .transacting(trx)
                    .then(async result2 => {
                        console.log('Get updated employee result isss', result2);
                    }).catch(updateErr => {
                        message = message || 'Error while updating employee';
                        throw updateErr;
                    });
            }

        }).catch(trxErr => {
            message = message || 'Error while start transaction';
            throw trxErr;
        });

        result = {
            success: true,
            error: false,
            statusCode: 200,
            message: !empId ? 'New Employee added successful' : 'Employee updated successful',
            data: []
        }
    } catch (error) {
        console.log('Error at try catch API result', error);
        result = {
            success: false,
            error: true,
            statusCode: 500,
            message: message || 'Error at try catch API result',
            data: []
        }
    }
    return response.status(200).json(result);
}

// Active or Inactivate employee - PUT METHOD
const updateEmployeeStatus = async (request, response, next) => {
    console.log('In updateEmployeeStatus(), request body isss', request.body);
    let result = {};
    let message = '';
    try {
        const {
            empId,
            userId,
            status
        } = request.body;

        // start transaction to update employee status
        await Employees.transaction(async trx => {

            await Employees.query(request.knex)
                .transacting(trx)
                .update(request.body)
                .alias('e')
                .whereRaw(`e.empId = ${Number(empId)}`)
                .then(async data => {
                    console.log('Get update employee data response', data);
                }).catch(updateErr => {
                    message = 'Error while update employee data';
                    throw updateErr;
                });

        }).catch(trxErr => {
            message = 'Error while start transaction to update employee data';
            throw trxErr;
        });

        result = {
            success: true,
            error: false,
            statusCode: 200,
            message: status == 0 ? 'Employee deactivated successful' : 'Employee restored successful',
            data: []
        }
    } catch (error) {
        console.log('Error at try catch API result', error);
        result = {
            success: false,
            error: true,
            statusCode: 500,
            message: message || 'Error at try catch API result',
            data: []
        }
    }
    return response.status(200).json(result);
}

// DELETE employee - DELETE METHOD
const deleteEmployeeData = async (request, response, next) => {
    console.log('In deleteEmployeeData(), request body isss', request.body);
    let result = {};
    let message = '';
    try {
        const {
            empId
        } = request.params;

        // start transaction to delete employee status
        await Employees.transaction(async trx => {

            await Employees.query(request.knex)
                .transacting(trx)
                .delete()
                .alias('e')
                .whereRaw(`e.empId = ${Number(empId)}`)
                .then(async data => {
                    console.log('Get delete employee data response', data);
                }).catch(updateErr => {
                    message = 'Error while delete employee data';
                    throw updateErr;
                });

        }).catch(trxErr => {
            message = 'Error while start transaction to delete employee data';
            throw trxErr;
        });

        result = {
            success: true,
            error: false,
            statusCode: 200,
            message:'Employee deleted successful',
            data: []
        }
    } catch (error) {
        console.log('Error at try catch API result', error);
        result = {
            success: false,
            error: true,
            statusCode: 500,
            message: message || 'Error at try catch API result',
            data: []
        }
    }
    return response.status(200).json(result);
}

module.exports = {
    getEmployeesData,
    addOrUpdateEmployeeData,
    updateEmployeeStatus,
    deleteEmployeeData
}