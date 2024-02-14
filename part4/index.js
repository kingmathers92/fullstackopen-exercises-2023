const app = require("./app");
const http = require("http");
const config = require("./utils/config");
const logger = require("./utils/logger");
const blogsRouter = require("./controllers/blog");

app.use("/api/blogs", blogsRouter); // Mounting the blog router

const server = http.createServer(app); // Create HTTP server

server.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`);
});
