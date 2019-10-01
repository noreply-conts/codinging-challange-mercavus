R(function (require, module, exports) {
  const App = require("./js/app");
  const instance = new App();
  instance.render()
    .catch(console.error)

}, function (err, exports) {
  if (err) {
    console.error(err);
  }
});
