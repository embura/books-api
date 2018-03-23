module.exports = (sequelize, Datatype) => {

  const Books = sequelize.define('Books', {
    id: {
      type: Datatype.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Datatype.STRING,
      allowNUll: false,
      validate: {
        notEmpty: true,
      },
    },
    description: {
      type: Datatype.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  });

  return Books;
};
