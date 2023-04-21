module.exports = (sequelize, DataTypes) => {
    let alias = 'Categoty';
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

    const Categoty = sequelize.define(alias, cols, config);

    /*
    categories.associate = function (models) {
        categories.belongsToMany(models.products, {
            as: "categories",
            foreignKey: "category_id"
        });
    }
    */

    return Categoty;

}