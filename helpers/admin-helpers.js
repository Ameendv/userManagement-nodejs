var db = require('../config/connection')
var collection = require('../config/collection')

const bcrypt = require('bcrypt')
const { ObjectId, ConnectionClosedEvent } = require('mongodb')


module.exports = {
    adminSignup: (adminData) => {
        return new Promise(async (resolve, reject) => {
            adminData.password = await bcrypt.hash(adminData.password, 10)
            db.get().collection(collection.ADMIN_COLLECTION).insertOne(adminData).then((data) => {
                resolve(data)
            })
        })

    },
    adminLogin: (adminData) => {
        return new Promise(async (resolve, reject) => {
            let adminStatus = false
            let response = {}
            let isAdmin = await db.get().collection(collection.ADMIN_COLLECTION).findOne({ email: adminData.email })
            if (isAdmin) {
                bcrypt.compare(adminData.password, isAdmin.password).then((state) => {
                    if (state) {
                        resolve(state)
                    }
                    else{
                       
                        resolve(state)
                    }

                })
            }else{
               resolve(isAdmin)
            }
        })
    },
    getUserData: () => {

        return new Promise(async (resolve, reject) => {
            let userData = await db.get().collection(collection.USER_COLLECTION).find().toArray()
            resolve(userData)

        })

    },
    deleteUser: (proId) => {
        return new Promise(async (resolve, reject) => {
            console.log(proId)
            db.get().collection(collection.USER_COLLECTION).deleteOne({ _id: ObjectId(proId) }).then((data) => {
                resolve(data)
            })
        })
    },
    editUser: (userId) => {
        return new Promise(async (resolve, reject) => {
            db.get().collection(collection.USER_COLLECTION).findOne({ _id: ObjectId(userId) }).then((data) => {
                resolve(data)
            })
        })
    },
    updateUser: (userId, userDetails) => {
        return new Promise(async (resolve, reject) => {
            if (userDetails.password) {
                userDetails.password = await bcrypt.hash(userDetails.password, 10)
                console.log(userDetails.password)
                db.get().collection(collection.USER_COLLECTION).updateOne({ _id: ObjectId(userId) }, { $set: { email: userDetails.email, name: userDetails.name, password: userDetails.password } }).then((state => {
                    console.log(state);
                    resolve(state)
                }))
            } else {
                db.get().collection(collection.USER_COLLECTION).updateOne({ _id: ObjectId(userId) }, { $set: { email: userDetails.email, name: userDetails.name, password: userDetails.password } }).then((state => {
                    console.log(state);
                    resolve(state)
                }))
            }


        })
    },
    doAdd: (userData) => {
        return new Promise(async (resolve, reject) => {
            userData.password = await bcrypt.hash(userData.password, 10)
            db.get().collection(collection.USER_COLLECTION).insertOne(userData).then((data) => {
                resolve(data)
            })
        })


    }
}

