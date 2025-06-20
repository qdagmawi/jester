// cart.test.js
const ShoppingCart = require('./cart');

let cart;

beforeEach(() => {
    cart = new ShoppingCart();
});

describe('addItem', () => {
    it('adds a new item to the cart', () => {
        cart.addItem({ id: '1', name: 'Apple', price: 1.0, quantity: 2 });
        expect(cart.getItems()).toHaveLength(1);
    });

    it('increments quantity if item already exists', () => {
        cart.addItem({ id: '1', name: 'Apple', price: 1.0, quantity: 2 });
        cart.addItem({ id: '1', name: 'Apple', price: 1.0, quantity: 3 });
        expect(cart.getItems()[0].quantity).toBe(5);
    });

    it('throws if item is invalid', () => {
        expect(() =>
            cart.addItem({ id: '', name: 'Apple', price: 1.0, quantity: 1 })
        ).toThrow();
        expect(() =>
            cart.addItem({ id: '2', name: 'Apple', price: -1.0, quantity: 1 })
        ).toThrow();
        expect(() =>
            cart.addItem({ id: '3', name: 'Apple', price: 1.0, quantity: 0 })
        ).toThrow();
    });
});

describe('removeItem', () => {
    it('removes existing item', () => {
        cart.addItem({ id: '1', name: 'Apple', price: 1.0, quantity: 2 });
        cart.removeItem('1');
        expect(cart.getItems()).toHaveLength(0);
    });

    it('throws if item does not exist', () => {
        expect(() => cart.removeItem('non-existent')).toThrow();
    });
});

describe('updateQuantity', () => {
    it('updates quantity of an existing item', () => {
        cart.addItem({ id: '1', name: 'Apple', price: 1.0, quantity: 2 });
        cart.updateQuantity('1', 5);
        expect(cart.getItems()[0].quantity).toBe(5);
    });

    it('removes item if new quantity is zero', () => {
        cart.addItem({ id: '1', name: 'Apple', price: 1.0, quantity: 2 });
        cart.updateQuantity('1', 0);
        expect(cart.getItems()).toHaveLength(0);
    });

    it('does nothing if item does not exist', () => {
        expect(() => cart.updateQuantity('non-existent', 3)).toThrow();
        expect(cart.getItems()).toHaveLength(0);
    });
});

describe('getItems', () => {
    it('returns an empty array if the cart is empty', () => {
        expect(cart.getItems()).toHaveLength(0);
    });

    it('returns all items in the cart', () => {
        cart.addItem({ id: '1', name: 'Apple', price: 1.0, quantity: 2 });
        cart.addItem({ id: '2', name: 'Banana', price: 0.5, quantity: 3 });
        const items = cart.getItems();
        expect(items).toHaveLength(2);
    });
});

describe('clearCart', () => {
    it('clears all items in the cart', () => {
        cart.addItem({ id: '1', name: 'Apple', price: 1.0, quantity: 2 });
        cart.clearCart();
        expect(cart.getItems()).toHaveLength(0);
    });

    it('does nothing if the cart is already empty', () => {
        cart.clearCart();
        expect(cart.getItems()).toHaveLength(0);
    });
});

describe('getTotalPrice', () => {
    it('returns 0 for an empty cart', () => {
        expect(cart.getTotalPrice()).toBe(0);
    });

    it('calculates total correctly', () => {
        cart.addItem({ id: '1', name: 'Apple', price: 1.0, quantity: 2 }); // $2
        cart.addItem({ id: '2', name: 'Banana', price: 0.5, quantity: 4 }); // $2
        expect(cart.getTotalPrice()).toBe(4);
    });
});
