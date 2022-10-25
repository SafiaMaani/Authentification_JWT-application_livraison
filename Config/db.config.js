const mongoose = require('mongoose')
const roles = ['client', 'livreur', 'manager']
const Role = require('../Models/roleModel')

const cnxDb = () => {
    mongoose.connect(process.env.DB_URI)
        .then((conn) => {
            console.log("I'm connected to DB");
            Role.countDocuments({}, (err, count) => {
                if (err) {
                    process.exit(1)
                }
                if (count == 0) {
                    roles.forEach(async (role) => {
                        const newRole = new Role({
                            role
                        });
                        await newRole.save();
                    })
                }
            })
        })
        .catch(err => console.log(err))
}

module.exports = cnxDb