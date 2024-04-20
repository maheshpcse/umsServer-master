const { raw } = require('objection');
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');
const moment = require('moment');
const config = require('../config/config');
const Users = require('../models/Users.model');

// Get user login - POST METHOD
const userLogin = async (request, response, next) => {
    console.log('request body isss', request.body);
    let userData = {};
    let message = '';
    try {
        const {
            userOrEmail,
            password
        } = request.body;

        await Users.query(request.knex)
            .select('u.*')
            .alias('u')
            .whereRaw(`u.username = '${userOrEmail}' OR u.email = '${userOrEmail}'`)
            .then(async result => {
                console.log('Get user login result isss', result);

                if (result && result.length > 0) {
                    const match = await bcrypt.compare(password, result[0].password);
                    console.log('match password isss', match);

                    if (match) {
                        userData = Object.assign({}, result[0]);
                        const accessToken = JWT.sign({
                            userId: userData.userId,
                            username: userData.username,
                            email: userData.email,
                            role: userData.role
                        }, config.database.securitykey, {
                            algorithm: 'HS256',
                            expiresIn: '30m'
                        });
                        const refreshToken = JWT.sign({
                            userId: userData.userId,
                            username: userData.username,
                            email: userData.email,
                            role: userData.role
                        }, config.database.securitykey, {
                            algorithm: 'HS256',
                            expiresIn: '1hr'
                        });
                        userData['token'] = accessToken;
                        userData['accessToken'] = accessToken;
                        userData['refreshToken'] = refreshToken;
                    } else {
                        message = 'Password is invalid';
                        throw new Error(message);
                    }
                } else if (result && result.length < 0) {
                    message = 'Username or Email is invalid';
                    throw new Error(message);
                } else {
                    message = 'Username or Email is not found';
                    throw new Error(message);
                }

            }).catch(getErr => {
                message = message || 'Error while user login';
                throw getErr;
            });

        return response.status(200).json({
            success: true,
            error: false,
            statusCode: 200,
            message: 'User login successful',
            data: userData
        });
    } catch (error) {
        console.log('Error at try catch API result', error);
        return response.status(200).json({
            success: false,
            error: true,
            statusCode: 500,
            message: message || 'Error at try catch API result',
            data: []
        });
    }
}

// Add new user - POST METHOD
const userSignup = async (request, response, next) => {
    console.log('request body isss', request.body);
    let message = '';
    try {
        const {
            password
        } = request.body;

        // hash and encrypt user password
        await bcrypt.hash(password, 10).then(async hash => {
            console.log('hash password isss:', hash);
            request.body['password'] = hash;
        }).catch(hashErr => {
            message = 'Error while encrypt the password';
            throw hashErr;
        });

        // start transaction to insert new user
        await Users.transaction(async trx => {

            request.body['userId'] = null;
            request.body['role'] = 'employee';
            request.body['status'] = 1;
            request.body['createdAt'] = moment().format('YYYY-MM-DD HH:mm:ss');
            console.log('final request.body isss:', request.body);

            await Users.query(request.knex)
                .insert(request.body)
                .transacting(trx)
                .then(async result => {
                    console.log('Get user signup result isss', result);
                }).catch(insertErr => {
                    message = message || 'Error while inserting new user';
                    throw insertErr;
                });

        }).catch(trxErr => {
            message = message || 'Error while start transaction';
            throw trxErr;
        });

        return response.status(200).json({
            success: true,
            error: false,
            statusCode: 200,
            message: 'User singup successful',
            data: []
        });
    } catch (error) {
        console.log('Error at try catch API result', error);
        return response.status(200).json({
            success: false,
            error: true,
            statusCode: 500,
            message: message || 'Error at try catch API result',
            data: []
        });
    }
}

// Validate User Token
const validateUserToken = async (request, response, next) => {
    console.log('request body isss', request.headers);
    let message = '';
    try {
        let token = request.headers['authorization'] || request.headers['x-access-token'];
        console.log('token isss:', token);

        if (!token || token === '') {
            message = 'Token is empty';
            throw new Error(message);
        }

        token = token.split(',')[0];

        console.log('final token isss', token);

        await JWT.verify(token, config.database.securitykey, async (err, decoded) => {
            if (err) {
                console.log('JWT error data isss:', err);
                message = err && err.message ? err.message : 'Error while jwt verification';
                throw new Error(message);
            } else {
                console.log('decoded data isss:', decoded);
                await Users.query(request.knex)
                    .select('u.*')
                    .alias('u')
                    .whereRaw(`u.email = '${decoded.email}'`)
                    .then(async data => {
                        console.log('Get admin data isss', data);
                        if (data && data.length <= 0) {
                            message = 'User data not found';
                            throw new Error(message);
                        } else if (data && data.length > 0) {
                            next();
                        } else {
                            message = 'Token is invalid'
                            throw new Error(message);
                        }
                    }).catch(getErr => {
                        message = 'Error while get user data';
                        throw getErr;
                    });
            }
        });

    } catch (error) {
        console.log('Error at try catch API result', error);
        return response.status(200).json({
            success: false,
            error: true,
            statusCode: 500,
            message: message || 'Error at try catch API result',
            data: []
        });
    }
}

module.exports = {
    userLogin,
    userSignup,
    validateUserToken
}