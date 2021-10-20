export default (sequelize, Sequelize) => {
  return sequelize.define(
    "counter",
    {
      value: {
        type: Sequelize.INTEGER,
      },
      liked: {
        type: Sequelize.BOOLEAN,
      },
    },
    { createdAt: false, updatedAt: false }
  );
};
