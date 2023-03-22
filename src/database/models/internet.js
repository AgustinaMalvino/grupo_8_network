module.exports = (sequelize, DataTypes) => {

    let cols = {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: 50,
        name: 100,
        name: 300
    };

    let config = {
        tableName: "internet",
        timestamps: false
    };

    const internet = sequelize.define("internet", cols, config);

    internet.associate = function(models) {
        internet.belongsToMany(models.internet, {
          as: "internet",
          foreignKey: "user_product"
        });
    }

    return internet;

}