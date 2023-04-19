module.exports = (sequelize, DataTypes) => {

    let cols = {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        products_id: {
            type: DataTypes.INTEGER
        },
        users_id: {
            type: DataTypes.INTEGER
        }
    };

    let config = {
        tableName: "users_products",
        timestamps: false
    };

    const users_products = sequelize.define("users_products", cols, config);

    users_products.associate = function(models) {
        users_products.belongsToMany(models.users_products, {
          as: "users_products",
          foreignKey: "users_products"
        });
    }

    return users_products;

}