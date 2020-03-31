const restify = require('restify');
const { sso } = require('node-expose-sspi');

var server = restify.createServer();
server.use(sso.auth());
server.get('/', (req, res) => {
  res.json(req.sso);
});

server.listen(3000, () => console.log('Server started on port 3000'));
