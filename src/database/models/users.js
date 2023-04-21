module.exports = (sequelize, DataTypes) => {
    let alias = 'User';
    let cols = {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        first_name: {
            type: DataTypes.STRING
        },
        last_name: {
            type: DataTypes.STRING
        },
        DNI: {
            type: DataTypes.INTEGER
        },
        email: {
            type: DataTypes.STRING
        },
        gender: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING
        },
        notifications: {
            type: DataTypes.BOOLEAN
        },
        image: {
            type: DataTypes.STRING
        },
        role: {
            type: DataTypes.STRING
        }
    };

    
    let config = {
        tableName: "users",
        timestamps: false
    };

    const User = sequelize.define(alias, cols, config);

    /*
    users.associate = function(models) {
        users.belongsToMany(models.Products, {
          as: "Products",
          through: "users_products",
          foreignKey: "users_products"
        });
    }
    */

    return User;

}