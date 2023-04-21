module.exports = (sequelize, DataTypes) => {
    let alias = "User_Product"
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

    const User_Product = sequelize.define(alias, cols, config);

    /*
    users_products.associate = function(models) {
        users_products.belongsToMany(models.users_products, {
          as: "users_products",
          foreignKey: "users_products"
        });
    }
    */

    return User_Product;

}