module.exports = (sequelize, DataTypes) => {
    let alias = 'Product';
    let cols = {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.STRING
        },
        image: {
            type: DataTypes.STRING
        },
        price: {
            type: DataTypes.INTEGER
        },
        offer: {
            type: DataTypes.INTEGER
        },
        discount: {
            type: DataTypes.INTEGER
        }
    };

    let config = {
        tableName: "products",
        timestamps: false
    };

    const Product = sequelize.define(alias, cols, config);

    /*
    Products.associate = function(models) {
        Products.belongsToMany(models.User, {
          as: "User",
          foreignKey: "product_id"
        });
    }
    */

    return Product;

}