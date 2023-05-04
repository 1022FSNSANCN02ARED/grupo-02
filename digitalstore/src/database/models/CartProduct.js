module.exports = (sequelize, dataTypes) => {
    let alias = 'CartProduct'; // esto debería estar en singular
    let cols = {
        id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        // created_at: dataTypes.TIMESTAMP,
        // updated_at: dataTypes.TIMESTAMP,
        count: dataTypes.BIGINT(10),
        idUser: dataTypes.BIGINT(10),
        idProduct: dataTypes.BIGINT(10),
    };
    let config = {
        tableName:"cartproduct",
        timestamps: false,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
    }
    const CartProduct = sequelize.define(alias,cols,config);

    CartProduct.associate = (models) => {
        CartProduct.belongsTo(models.Product, {
            as: "product",
            foreignKey:"idProduct"
        });
        CartProduct.belongsTo(models.User, {
            as: "user",
            foreignKey:"idUser"
        });
    };

    return CartProduct;
};
