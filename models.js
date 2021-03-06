const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  database: 'simply_bargains',
  dialect: 'postgres',
  operatorsAliases: false,
  define: {
    underscored: true
  }
});

const User = sequelize.define('users', {
  username: Sequelize.STRING,
  first_name: Sequelize.STRING,
  last_name: Sequelize.STRING,
  password_digest: Sequelize.STRING,
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  img: Sequelize.STRING,
  review: Sequelize.STRING
});

const Product = sequelize.define('products', {
  title: Sequelize.STRING,
  description: Sequelize.STRING,
  price: Sequelize.STRING,
  gender: Sequelize.STRING,
  img: Sequelize.STRING
});

const Review = sequelize.define('reviews', {
  title: Sequelize.STRING,
  review: Sequelize.STRING,
});

User.hasMany(Product);
User.hasMany(Review);
Review.belongsTo(User);
Product.hasMany(User);


User.hasMany(Product, {
  onDelete: 'cascade',
  foreignKey: {
    allowNull: false
  }
});

Product.hasMany(User, {
  foreignKey: {
    allowNull: false
  }
});

module.exports = {
  sequelize,
  User,
  Product,
  Review,
};
