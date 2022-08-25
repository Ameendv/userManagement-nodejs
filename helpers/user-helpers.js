var db = require('../config/connection')
var collection = require('../config/collection')

const bcrypt = require('bcrypt')



module.exports = {
    doSignup: (userData) => {
        return new Promise(async (resolve, reject) => {
            userData.password = await bcrypt.hash(userData.password, 10)
            db.get().collection(collection.USER_COLLECTION).insertOne(userData).then((data) => {
                resolve(data)
            })
        })

    },
    doLogin: (userData) => {

        return new Promise(async (resolve, reject) => {
            let loginStatus = false
            let response = {}
            let user = await db.get().collection(collection.USER_COLLECTION).findOne({ email: userData.email })
            if (user) {

                bcrypt.compare(userData.password,user.password).then((state) => {

                    if (state) {
                        console.log("login succesfull")
                        response.user = user
                        response.status = true
                        resolve(response)
                    }
                    else {
                        console.log("invalid password")
                        response.user = user
                        resolve(response)
                    }
                })
            }
            else {
                console.log("Invalid mail Id")
                response.mailError = true
                resolve(response)
            }
        })
    }
}