const c = require("../controller/article.controller")

const articleRoutes = (app) => {
    app.get("/articles", c.getAllArticle)
}

module.exports = {
    articleRoutes
}