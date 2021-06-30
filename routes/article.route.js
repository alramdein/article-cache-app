const c = require("../controller/article.controller")

const articleRoutes = (app) => {
    app.get("/articles", c.getAllArticle)
    app.post("/articles", c.addArticle)
}

module.exports = {
    articleRoutes
}