module.exports = (sequelize, DataTypes) => {

    let cols = {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: "Clásico",
        name: "HD"
    };

    let config = {
        tableName: "cable",
        timestamps: false
    };

    const cable = sequelize.define("cable", cols, config);

    cable.associate = function(models) {
        cable.belongsToMany(models.cable, {
          as: "cable",
          foreignKey: "user_product"
        });
    }

    return cable;

}