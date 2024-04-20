const { Model } = require('objection');

class Users extends Model {
    static get tableName() {
        return 'users';
    }

    static get idColumn() {
        return 'userId';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            properties: {
                userId: { type: ['integer', 'null'] },                      // Primary Key Id (Auto increment)
                fullname: { type: ['string', 'null'] },
                username: { type: ['string', 'null'] },
                email: { type: ['string', 'null'] },
                password: { type: ['string', 'null'] },
                address: { type: ['string', 'null'] },
                mobile: { type: ['string', 'null'] },
                profile: { type: ['string', 'null'] },
                role: { type: ['string', 'null'] },                   // employee,admin. Default: employee
                status: { type: ['integer', 'number', 'null'] },      // 0-Inactive, 1-Active, 2-Blocked. Default: 1-Active
                createdAt: { type: ['string', 'null'] },
                updatedAt: { type: ['string', 'null'] }
            }
        }
    }
}

module.exports = Users;