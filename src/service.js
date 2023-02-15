const { getDB, updateDB, cleanDB } = require('./helper/db')

const getAllItems = (req, res) => {
    try {
        const db = getDB();
        res.status(200).send(db);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}

const getItems = (req, res) => {
    try {
        //TODO: need to add pagination and search
        const { item } = req.params;
        const db = getDB();
        const data = db[item] || []
        res.status(200).send(data);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}

const getItemById = (req, res) => {
    try {
        const { item, id } = req.params
        const db = getDB();

        if (!Number(id)) {
            res.status(404).send('Item not found');
            return
        }

        const data = db[item].find(dt => dt.id === Number(id))
        if (!data) {
            res.status(404).send('Item not found');
            return
        }
        res.status(200).send(data);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}

const addItem = (req, res) => {
    try {
        const body = req.body
        const { item } = req.params;

        if (!(typeof body === 'object' && body !== null)) {
            res.status(401).send('Body must be an object');
            return
        }

        if (!Object.keys(body).length) {
            res.status(401).send('Body can not be empty');
            return
        }

        let db = getDB();
        if (db[item]) body.id = db[item].length + 1;
        else body['id'] = 1;

        if (db[item]) db[item].push(body)
        else db[item] = [body];

        updateDB(db)
        res.status(201).send(body);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}

const deleteItemById = (req, res) => {
    try {
        const { item, id } = req.params;

        if (!Number(id)) {
            res.status(404).send('Item not found');
            return
        }

        const db = getDB();
        const data = db[item].find(dt => dt.id === Number(id))
        if (!data) {
            res.status(404).send('Item not found');
            return
        }
        db[item] = db[item].filter(dt => dt.id !== Number(id))
        updateDB(db)

        res.status(204).send();
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}

const replaceItemById = (req, res) => {
    try {
        const { item, id } = req.params;
        const body = req.body;
        delete body.id;

        if (!Number(id)) {
            res.status(404).send('Item not found');
            return
        }

        const db = getDB();
        const data = db[item].find(dt => dt.id === Number(id))
        if (!data) {
            res.status(404).send('Item not found');
            return
        }

        const updatedItem = { id: data.id, ...body }
        db[item] = db[item].map(dt => {
            if (dt.id === Number(id))
                return updatedItem;
            return dt;
        })
        updateDB(db)

        res.status(200).send(updatedItem);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}

const updateItemById = (req, res) => {
    try {
        const { item, id } = req.params;
        const body = req.body;
        delete body.id;

        if (!Number(id)) {
            res.status(404).send('Item not found');
            return
        }

        const db = getDB();
        const data = db[item].find(dt => dt.id === Number(id))
        if (!data) {
            res.status(404).send('Item not found');
            return
        }

        const updatedItem = { ...data, ...body }
        db[item] = db[item].map(dt => {
            if (dt.id === Number(id))
                return updatedItem;
            return dt;
        })
        updateDB(db)

        res.status(200).send(updatedItem);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}

const resetAllItems = (req, res) => {
    try {
        cleanDB();
        res.status(204).send();
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}

module.exports = {
    getAllItems,
    addItem,
    getItems,
    getItemById,
    replaceItemById,
    updateItemById,
    deleteItemById,
    resetAllItems,
}