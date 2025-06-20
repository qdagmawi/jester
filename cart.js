// cart.js
class ShoppingCart {
    constructor() {
        this.items = new Map(); // key: itemId (string), value: item object
    }

    addItem(item) {
        const { id, name, price, quantity } = item;

        if (!id) {
            throw new Error('Item must have a non-empty "id".');
        }
        if (typeof price !== 'number' || price < 0) {
            throw new Error('Item "price" must be a non-negative number.');
        }
        if (typeof quantity !== 'number' || quantity <= 0) {
            throw new Error('Item "quantity" must be a number greater than zero.');
        }

        const itemId = String(id);
        if (this.items.has(itemId)) {
            const existing = this.items.get(itemId);
            existing.quantity += quantity;
        } else {
            this.items.set(itemId, { id: itemId, name, price, quantity });
        }
    }
    getItems() {
        return Array.from(this.items.values());
    }

    removeItem(itemId) {
        const key = String(itemId);
        if (!this.items.has(key)) {
            throw new Error(`Cannot remove item. Item with ID "${itemId}" does not exist.`);
        }
        this.items.delete(key);
    }

    updateQuantity(itemId, newQuantity) {
        const key = String(itemId);
        if (!this.items.has(key)) {
            throw new Error(`Cannot update quantity. Item with ID "${itemId}" does not exist.`);
        }

        if (typeof newQuantity !== 'number') {
            throw new Error('New quantity must be a number.');
        }

        if (newQuantity <= 0) {
            this.items.delete(key);
        } else {
            const item = this.items.get(key);
            item.quantity = newQuantity;
        }
    }
}

module.exports = ShoppingCart;
