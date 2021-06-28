const db = require("../helpers/db.helper")
const v = require("../helpers/validation.helper")

articleController = {}

articleController.getAllArticle = async (req, res) => {
    try {
        const query = req.query.query
        const author = req.query.author
    
        qres = await db.pgPool("SELECT * FROM articles "+
                  "WHERE (($1::varchar IS NULL OR $1 = '')"+
                  "OR title ILIKE '%' || $1 || '%'"+
                  "OR body ILIKE '%' || $1 || '%')"+
                  "AND (($2::varchar IS NULL OR $2 = '')"+
                  "OR author ILIKE '%' || $2 || '%')"+
                  "ORDER BY createdat DESC",
                  [query, author])
        
        fres = {
            success: 1,
            count: qres.count,
            data: qres.data
        }

        res.send(fres)
    } catch(err) {
        console.error(err);
        fres = {
            success: 0,
            message: "Failed to get all article." 
        }

        res.status(500).send(fres)
    }
}

articleController.addArticle = (req, res) => {
    try {
        const author = req.body.author
        const title = req.body.title
        const body = req.body.body

        if (v.isNull(author) || v.isNull(title) || v.isNull(body)) {
            fres = {
                success: 0,
                message: "Required parameter is not satisfied."
            }
            res.status(400).send(fres)
            return
        }

        db.pgPool("INSERT INTO articles(author, title, body) VALUES($1, $2, $3)",
                    [author, title, body])

        fres = {
            success: 1,
            message: "Successfully added article." 
        }

        res.send(fres)
    } catch(err) {
        console.error(err);
        fres = {
            success: 0,
            message: "Failed to create article."
        }
        res.status(500).send(fres)
        return
    }
    
}

module.exports = articleController