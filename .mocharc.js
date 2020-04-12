module.exports = {
  require: ['ts-node/register', 'source-map-support/register'],
  spec: 'test/**/*.spec.ts',
  recursive: true,
  extension: ['ts'],
};
