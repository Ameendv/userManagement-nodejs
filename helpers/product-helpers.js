var db = require('../config/connection')
var collection = require('../config/collection')
const { ReturnDocument } = require('mongodb')

module.exports={
    getProducts:()=>{
        return  new Promise(async(resolve,reject)=>{
            let products=await db.get().collection(collection.PRODUCT_COLLECTION).find().toArray()
            resolve(products)
        })
    }
}