# Express pkg example

`pkg` is a node module for building `.exe` file. See (pkg)[https://www.npmjs.com/package/pkg]

```cmd
npm i
npm run build:js
npm run build:exe
cd dist
server.exe
```

If you need to deploy `server.exe`, you must also deploy the `node-expose-sspi.node` file in the same directory.

Example:

Suppose you want to deploy to `${DEST_DIR}`.

`ARCH` = `x64` or `ia32`.

```
cp dist/server.exe ${DEST_DIR}
cp node_modules/node-expose-sspi/lib/arch/${ARCH}/node-expose-sspi.node ${DEST_DIR}
```

## Author

Jean-Louis GUENEGO <jlguenego@gmail.com>
