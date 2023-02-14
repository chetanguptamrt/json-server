const fs = require('fs')

let db = null;
const path = `${process.env.DB_NAME}.json`

const getDB = () => {
    try {
        if (db === null) {
            if (fs.existsSync(path)) {
                db = JSON.parse(fs.readFileSync(path).toString())
            } else {
                fs.writeFileSync(path, '{}')
                db = {}
            }
        }
        return db;
    } catch (err) {
        console.log(err)
        throw new Error(err)
    }
}

const updateDB = (_db) => {
    try {
        fs.writeFileSync(path, JSON.stringify(_db))
        db = _db
    } catch (err) {
        console.log(err)
        throw new Error(err)
    }
}

const cleanDB = () => {
    try {
        if (fs.existsSync(path)) fs.unlinkSync(path)
    } catch (err) {
        console.log(err)
        throw new Error(err)
    }
}

module.exports = {
    getDB,
    updateDB,
    cleanDB,
    path,
};