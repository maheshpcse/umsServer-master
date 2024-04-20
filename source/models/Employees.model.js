const { Model } = require('objection');

class Employees extends Model {
    static get tableName() {
        return 'employees';
    }

    static get idColumn() {
        return 'empId';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            properties: {
                empId: { type: ['integer', 'null'] },                // Primary Key Id (Auto increment)
                fname: { type: ['string', 'null'] },
                lname: { type: ['string', 'null'] },
                emailId: { type: ['string', 'null'] },
                dept: { type: ['string', 'null'] },
                dob: { type: ['string', 'null'] },
                profileIcon: { type: ['string', 'null'] },
                status: { type: ['integer', 'number', 'null'] },      // 0-Inactive, 1-Active, 2-Blocked. Default: 1-Active
                createdBy: { type: ['integer', 'number', 'null'] },
                createdAt: { type: ['string', 'null'] },
                updatedAt: { type: ['string', 'null'] }
            }
        }
    }
}

module.exports = Employees;