module.exports = (sequelize, dataTypes) => {
    let alias = 'Product'; // esto debería estar en singular
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
        price: {
            type: dataTypes.BIGINT(100),
            allowNull: false
        },
        idCategory: dataTypes.BIGINT(10),
        description: {
            type: dataTypes.TEXT(),
            allowNull: false
        },
        idBrand: dataTypes.BIGINT(10),
        image: {
            type: dataTypes.STRING(255),
            allowNull: false
        },
        discount: {
            type: dataTypes.STRING(255),
            allowNull: false
        },
    };
    let config = {
        tableName: "products",
        timestamps: false,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
    }
    const Product = sequelize.define(alias,cols,config);

    Product.associate = function (models) {
        Product.belongsTo(models.Category, { // models.Category -> Category es el valor de alias en Category.js
            as: "category",
            foreignKey: "idCategory"
        })
        Product.belongsTo(models.Brand, { // models.Brand -> Brand es el valor de alias en Brand.js
            as: "brand",
            foreignKey: "idBrand"
        })
    }

  
      
    

    return Product
};