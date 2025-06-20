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


