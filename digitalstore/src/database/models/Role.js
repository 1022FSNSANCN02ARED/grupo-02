module.exports = (sequelize, dataTypes) => {
    let alias = 'Role'; // esto debería estar en singular
    let cols = {
        id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        // created_at: dataTypes.TIMESTAMP,
        // updated_at: dataTypes.TIMESTAMP,
        role: {
            type: dataTypes.STRING(255),
            allowNull: false
        },
    };
    let config = {
        tableName:"roles",
        timestamps: false,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
    }
    const Role = sequelize.define(alias,cols,config);

    Role.associate = function (models) {
        Role.hasMany(models.User, { // models.User -> User es el valor de alias en User.js
            as: "user",
            foreignKey: "idRole"
        })
    }

    return Role
};