// teardown.js

module.exports = async () => {
  await global.__SERVER__.stop();

  process.exit(0);
};
