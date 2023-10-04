module.exports = (db) => {
    db.InventoryItem.afterCreate((inventoryItem) => {
        db.NativeItem.findByPk(inventoryItem.dataValues.itemId).then((item) => {
            if (item.dataValues.unique) {
                db.InventoryItem.destroy({ where: { itemId: item.dataValues.id, id: { [db.Sequelize.Op.ne]: inventoryItem.dataValues.id } } })
            }
        })
    })
    db.InventoryItem.afterUpdate((inventoryItem) => {
        if (inventoryItem.dataValues.quantity !== inventoryItem._previousDataValues.quantity && inventoryItem.dataValues.quantity <= 0) {
            inventoryItem.destroy();
        }
    })
}