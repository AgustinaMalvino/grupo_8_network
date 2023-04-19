module.exports = (sequelize, DataTypes) => {

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
        adress: {
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
        birth_date: {
            type: DataTypes.DATE
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
        },
        product_id: {
            type: DataTypes.INTEGER
        }
    };

    let config = {
        tableName: "users",
        timestamps: false
    };

    const Users = sequelize.define("Users", cols, config);

    Users.associate = function(models) {
        Users.belongsToMany(models.Products, {
          as: "Products",
          through: "users_products",
          foreignKey: "users_products"
        });
    }

    return Users;

}