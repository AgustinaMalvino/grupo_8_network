module.exports = (sequelize, DataTypes) => {

    let cols = {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: "Netflix",
        name: "YouTube",
        name: "Spotify"
    };

    let config = {
        tableName: "aplicaciones",
        timestamps: false
    };

    const aplicaciones = sequelize.define("aplicaciones", cols, config);

    aplicaciones.associate = function(models) {
        aplicaciones.belongsToMany(models.aplicaciones, {
          as: "aplicaciones",
          foreignKey: "user_product"
        });
    }

    return aplicaciones;

}