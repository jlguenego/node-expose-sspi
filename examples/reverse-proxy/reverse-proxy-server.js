const express = require('express');
const { sso } = require('node-expose-sspi');
const { encode, decode } = require('base64-arraybuffer');
const { createProxyMiddleware } = require('http-proxy-middleware');

// Thanks https://developers.google.com/web/updates/2012/06/How-to-convert-ArrayBuffer-to-and-from-String
function ab2str(buf) {
  return String.fromCharCode.apply(null, new Uint16Array(buf));
}
function str2ab(str) {
  const buf = new ArrayBuffer(str.length * 2); // 2 bytes for each char
  const bufView = new Uint16Array(buf);
  for (let i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
}

{
  // Business server
  const app = express();

  app.use((req, res, next) => {
    if (req.header('x-sso')) {
      req.sso = JSON.parse(ab2str(decode(req.header('x-sso'))));
    }
    next();
  });

  app.use((req, res) => {
    res.json({
      sso: req.sso,
    });
  });
  app.listen(3000, () => console.log('Server started on port 3000'));
}

{
  // Reverse proxy
  const proxy = createProxyMiddleware('http://localhost:3000');

  const app = express();

  app.use(sso.auth({ useOwner: false }));
  app.use((req, res, next) => {
    if (req.sso) {
      // avoid header too large (error HTTP 431), so reduce it.
      const xSso = {
        user: req.sso.user,
      };
      req.headers['x-sso'] = encode(str2ab(JSON.stringify(xSso)));
    }
    next();
  });

  app.use(proxy);

  app.listen(9000, () => console.log('Reverse proxy started on port 9000'));
}
