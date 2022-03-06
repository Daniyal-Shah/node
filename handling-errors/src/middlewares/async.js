module.exports = function (handler) {
  return async (req, res) => {
    try {
      await handler();
    } catch (error) {
      res.status(500).send("Something failed");
    }
  };
};
