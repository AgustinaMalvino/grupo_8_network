module.exports = (sequelize, DataTypes) => {

    let cols = {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING
        }
    };

    let config = {
        tableName: "categories",
        timestamps: false
    };

    const categories = sequelize.define("categories", cols, config);

    categories.associate = function (models) {
        categories.belongsToMany(models.categories, {
            as: "categories",
            foreignKey: "user_product"
        });
    }

    return categories;

}