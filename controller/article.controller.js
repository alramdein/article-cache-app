const db = require("../helpers/db.helper")

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
            message: "Failed to get all article. See error log." 
        }

        res.status(500).send(fres)
    }
}

module.exports = articleController