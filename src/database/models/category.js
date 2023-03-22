module.exports = (sequelize, DataTypes) => {

    let cols = {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        cable: {
            type: DataTypes.STRING
        },
        internet: {
            type: DataTypes.INTEGER
        },
        paquetes: {
            type: DataTypes.STRING
        },
        aplicaciones: {
            type: DataTypes.STRING
        }
    };

    let config = {
        tableName: "category",
        timestamps: false
    };

    const category = sequelize.define("category", cols, config);

    category.associate = function(models) {
        category.belongsToMany(models.category, {
          as: "category",
          foreignKey: "user_product"
        });
    }

    return category;

}