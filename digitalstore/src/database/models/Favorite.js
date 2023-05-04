module.exports = (sequelize, dataTypes) => {
    let alias = 'Favorite'; // esto debería estar en singular
    let cols = {
        id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        // created_at: dataTypes.TIMESTAMP,
        // updated_at: dataTypes.TIMESTAMP,
        idUser: dataTypes.BIGINT(10),
        idProduct: dataTypes.BIGINT(10),
    };
    let config = {
        tableName:"favorites",
        timestamps: false,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
    }
    const Favorite = sequelize.define(alias,cols,config);

    Favorite.associate = (models) => {
        Favorite.belongsTo(models.Product, {
            as: "product",
            foreignKey:"idProduct"
        });
        Favorite.belongsTo(models.User, {
            as: "user",
            foreignKey:"idUser"
        });
    };

    return Favorite;
};
