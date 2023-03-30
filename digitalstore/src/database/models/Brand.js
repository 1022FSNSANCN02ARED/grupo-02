module.exports = (sequelize, dataTypes) => {
    let alias = 'Brand'; // esto debería estar en singular
    let cols = {
        id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        // created_at: dataTypes.TIMESTAMP,
        // updated_at: dataTypes.TIMESTAMP,
        name: {
            type: dataTypes.STRING(255),
            allowNull: false
        },
    };
    let config = {
        tableName:"brands",
        timestamps: false,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
    }
    const Brand = sequelize.define(alias,cols,config);

    Brand.associate = function (models) {
        Brand.hasMany(models.Product, { // models.Product -> Product es el valor de alias en Product.js
            as: "product",
            foreignKey: "idBrand"
        })
    }

    return Brand
};