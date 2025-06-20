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


}

module.exports = ShoppingCart;
