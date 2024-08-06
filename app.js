const app = require('./server.js');
const { sequelize } = require('./models');

const PORT = process.env.PORT || 9000;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server started succesfully`);
  });
});
