const ShoppingCart = require('./cart');

describe('ShoppingCart', () => {
    describe('addItem', () => {
        it('should add a new item to the cart', () => {
            const cart = new ShoppingCart();
            cart.addItem({ id: '1', name: 'Apple', price: 1.5, quantity: 2 });

            const items = cart.getItems();
            expect(items.length).toBe(1);
            expect(items[0]).toEqual({
                id: '1',
                name: 'Apple',
                price: 1.5,
                quantity: 2,
            });
        });

        it('should increment quantity if item already exists', () => {
            const cart = new ShoppingCart();
            cart.addItem({ id: '1', name: 'Apple', price: 1.5, quantity: 2 });
            cart.addItem({ id: '1', name: 'Apple', price: 1.5, quantity: 3 });

            const item = cart.getItems().find(i => i.id === '1');
            expect(item.quantity).toBe(5);
        });

        it('should throw error for missing item ID', () => {
            const cart = new ShoppingCart();
            expect(() =>
                cart.addItem({ id: '', name: 'Apple', price: 1.5, quantity: 1 })
            ).toThrow('Item must have a non-empty "id".');
        });

        it('should throw error for negative price', () => {
            const cart = new ShoppingCart();
            expect(() =>
                cart.addItem({ id: '2', name: 'Banana', price: -1, quantity: 1 })
            ).toThrow('Item "price" must be a non-negative number.');
        });

        it('should throw error for zero quantity', () => {
            const cart = new ShoppingCart();
            expect(() =>
                cart.addItem({ id: '3', name: 'Cherry', price: 1.0, quantity: 0 })
            ).toThrow('Item "quantity" must be a number greater than zero.');
        });
    });

    describe('removeItem', () => {
        it('should remove an existing item', () => {
            const cart = new ShoppingCart();
            cart.addItem({ id: '1', name: 'Apple', price: 1.0, quantity: 2 });
            cart.removeItem('1');

            expect(cart.getItems().length).toBe(0);
        });

        it('should throw error when removing a non-existent item', () => {
            const cart = new ShoppingCart();
            expect(() => cart.removeItem('999'))
                .toThrow('Cannot remove item. Item with ID "999" does not exist.');
        });
    });

    describe('updateQuantity', () => {
        it('should update the quantity of an existing item', () => {
            const cart = new ShoppingCart();
            cart.addItem({ id: '1', name: 'Apple', price: 1.0, quantity: 2 });
            cart.updateQuantity('1', 5);

            const item = cart.getItems().find(i => i.id === '1');
            expect(item.quantity).toBe(5);
        });

        it('should remove item when updated quantity is zero', () => {
            const cart = new ShoppingCart();
            cart.addItem({ id: '1', name: 'Apple', price: 1.0, quantity: 2 });
            cart.updateQuantity('1', 0);

            expect(cart.getItems().length).toBe(0);
        });

        it('should throw error if item does not exist', () => {
            const cart = new ShoppingCart();
            expect(() => cart.updateQuantity('999', 3))
                .toThrow('Cannot update quantity. Item with ID "999" does not exist.');
        });

        it('should throw error if new quantity is not a number', () => {
            const cart = new ShoppingCart();
            cart.addItem({ id: '1', name: 'Apple', price: 1.0, quantity: 2 });

            expect(() => cart.updateQuantity('1', 'abc'))
                .toThrow('New quantity must be a number.');
        });
    });

    describe('getItems', () => {
        it('should return empty array if cart is empty', () => {
            const cart = new ShoppingCart();
            expect(cart.getItems()).toEqual([]);
        });

        it('should return all added items', () => {
            const cart = new ShoppingCart();
            cart.addItem({ id: '1', name: 'Apple', price: 1.0, quantity: 2 });
            cart.addItem({ id: '2', name: 'Banana', price: 0.5, quantity: 3 });

            const items = cart.getItems();
            expect(items.length).toBe(2);
            expect(items).toEqual([
                { id: '1', name: 'Apple', price: 1.0, quantity: 2 },
                { id: '2', name: 'Banana', price: 0.5, quantity: 3 }
            ]);
        });
    });

    describe('clearCart', () => {
        it('should clear all items from the cart', () => {
            const cart = new ShoppingCart();
            cart.addItem({ id: '1', name: 'Apple', price: 1.0, quantity: 2 });
            cart.clearCart();

            expect(cart.getItems().length).toBe(0);
        });

        it('should still return empty array when cleared twice', () => {
            const cart = new ShoppingCart();
            cart.clearCart();
            cart.clearCart();

            expect(cart.getItems()).toEqual([]);
        });
    });

    describe('getTotalPrice', () => {
        it('should return 0 for empty cart', () => {
            const cart = new ShoppingCart();
            expect(cart.getTotalPrice()).toBe(0);
        });

        it('should calculate the correct total price', () => {
            const cart = new ShoppingCart();
            cart.addItem({ id: '1', name: 'Apple', price: 1.0, quantity: 2 });   // $2
            cart.addItem({ id: '2', name: 'Banana', price: 0.5, quantity: 4 });  // $2

            expect(cart.getTotalPrice()).toBe(4);
        });
    });
});
