module.exports = (sequelize, dataTypes) => {
    let alias = 'Category'; // esto debería estar en singular
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
        tableName: "categories",
        timestamps: false,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
    }
    const Category = sequelize.define(alias,cols,config);

    Category.associate = function (models) {
        Category.hasMany(models.Product, { // models.Product -> Product es el valor de alias en Product.js
            as: "product",
            foreignKey: "idCategory"
        })
    }

    return Category
};