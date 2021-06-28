const config = require("../config/db.config")

const db = {}

// query = SQL query
// params = array of param value
db.pgPool = (query, params) => {

    return new Promise((resolve, reject) => {
        config.pool
            .connect()
            .then(client => {
                return client
                    .query(query, params)
                    .then(res => {
                        client.release()
                        resolve(res.rows)
                    })
                    .catch(err => {
                        client.release()
                        reject(err)
                    })
            })
    })
}

module.exports = db