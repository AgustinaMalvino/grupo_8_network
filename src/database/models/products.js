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
        }
    };

    let config = {
        tableName: "products",
        timestamps: false
    };

    const Products = sequelize.define("Products", cols, config);

    Products.associate = function(models) {
        Users.belongsToMany(models.category, {
          as: "products",
          foreignKey: "user_product"
        });
    }

    return Users;

}