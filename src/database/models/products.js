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
        },
        tags: {
            type: DataTypes.STRING
        },
        categoryId: {
            type: DataTypes.INTEGER
        }
    };

    let config = {
        tableName: "products",
        timestamps: false,
        underscore: true
    };
    const Product = sequelize.define(alias, cols, config);

    Product.associate = function(models) {
        Product.belongsTo(models.Category, {
          as: "Category",
          foreignKey: "categoryId"
        });
    }

    return Product;

}