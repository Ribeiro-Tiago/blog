var restify = require('restify');
var fs = require('fs');
var controllers = {};
var controllers_path = process.cwd() + '/app/controllers';
var server = restify.createServer();
var port = process.env.PORT || 8081;

fs.readdirSync(controllers_path).forEach(function (file) {
	if (file.indexOf('.js') != -1) {
		controllers[file.split('.')[0]] = require(controllers_path + '/' + file)
	}
});

server.use(restify.fullResponse()).use(restify.bodyParser());

/** router **/
server.get("/", restify.serveStatic({
	'directory': 'www',
	'default': 'index.html'
}));

server.get("/user/all", controllers.user.list);
server.get("/user/:name", controllers.user.view);

// Article Start
// server.post("/articles", controllers.article.createArticle)
// server.put("/articles/:id", controllers.article.updateArticle)
// server.del("/articles/:id", controllers.article.deleteArticle)
// server.get({path: "/articles/:id", version: "1.0.0"}, controllers.article.viewArticle)
// server.get({path: "/articles/:id", version: "2.0.0"}, controllers.article.viewArticle_v2)
// Article End
 
// Comment Start
// server.post("/comments", controllers.comment.createComment)
// server.put("/comments/:id", controllers.comment.viewComment)
// server.del("/comments/:id", controllers.comment.deleteComment)
// server.get("/comments/:id", controllers.comment.viewComment)
// Comment End
 

server.listen(port, function (err) {
	if (err)
		console.error(err)
	else
		console.log('App is ready at : ' + port)
});

if (process.env.environment == 'production')
{
	process.on('uncaughtException', function (err) {
		console.error(JSON.parse(JSON.stringify(err, ['stack', 'message', 'inner'], 2)))
	})
}