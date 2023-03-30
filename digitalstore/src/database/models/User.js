module.exports = (sequelize, dataTypes) => {
    let alias = 'User'; // esto debería estar en singular
    let cols = {
        id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        // created_at: dataTypes.TIMESTAMP,
        // updated_at: dataTypes.TIMESTAMP,
        firstName: {
            type: dataTypes.STRING(255),
            allowNull: false
        },
        lastName: {
            type: dataTypes.STRING(255),
            allowNull: false
        },
        userName: {
            type: dataTypes.STRING(255),
            allowNull: false
        },
        password: {
            type: dataTypes.STRING(255),
            allowNull: false
        },
        email: {
            type: dataTypes.STRING(255),
            allowNull: false
        },
        img: {
            type: dataTypes.DECIMAL(3, 1).UNSIGNED,
            allowNull: false
        },
        idRole: dataTypes.BIGINT(10)
    };
    let config = {
        tableName:"users",
        timestamps: false,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
    }
    const User = sequelize.define(alias,cols,config);

    User.associate = function (models) {
        User.belongsTo(models.Role, { // models.Role -> Role es el valor de alias en Role.js
            as: "role",
            foreignKey: "idRole"
        })
    }

    return User
};