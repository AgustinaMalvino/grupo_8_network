module.exports = (sequelize, DataTypes) => {

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
        },
        category_id: {
            type: DataTypes.INTEGER
        },
        user_id: {
            type: DataTypes.INTEGER
        }
    };

    let config = {
        tableName: "products",
        timestamps: false
    };

    const Products = sequelize.define("Products", cols, config);

    Products.associate = function(models) {
        Products.belongsToMany(models.User, {
          as: "User",
          foreignKey: "product_id"
        });
    }

    return Products;

}