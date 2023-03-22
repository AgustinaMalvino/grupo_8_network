module.exports = (sequelize, DataTypes) => {

    let cols = {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: "Paramount Plus",
        name: "Disney+",
        name: "Star+",
        name: "HBO Max"
    };

    let config = {
        tableName: "paquetes",
        timestamps: false
    };

    const paquetes = sequelize.define("paquetes", cols, config);

    paquetes.associate = function(models) {
        paquetes.belongsToMany(models.paquetes, {
          as: "paquetes",
          foreignKey: "user_product"
        });
    }

    return paquetes;

}