module.exports = (sequelize, DataTypes) => {

    let alias = "Productos"
    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: DataTypes.STRING
        },
        categoria: {
            type: DataTypes.STRING
        },


    };
    let config = {
        tableName: "Products",
        timetamps: false
    }

    const Producto = sequelize.define(alias, cols, config)
    return Producto
}