export const calcVariants = (sideDishes = []) => {
    const price = sideDishes.reduce(
        (p, c) => p + (c.amount - 0 || 0) * (c.price - 0 || 0), 0)
    return typeof price === 'number' && !isNaN(price) ? price : 0
}

export const calcPizzaVariants = (pizzaVariant = []) => {
    const price = pizzaVariant.reduce((p, c) => {
        return p + (c.full ? c.full_price : c.halfLeft || c.halfRight
            ? c.half_price : 0)
    }, 0)
    return typeof price === 'number' && !isNaN(price) ? price : 0
}

const initCart = () => JSON.parse(JSON.stringify({
    storeId: '',
    items: [],
    total: 0
}))

const CART_KEY = 'otlop-cart'
export const saveToCart = async (dish) => {
    let cart = getCart()
    if (!cart || (dish.store_id !== cart.storeId)) {
        cart = initCart()
        cart.storeId = dish.store_id
    }
    const foundIndex = cart.items.findIndex(
        d => d.cart_item_id === dish.cart_item_id)
    dish.amount = 1
    dish.cart_item_id = Number(new Date())
    if (foundIndex === -1) {
        cart.items.push(dish)
    } else {
        cart.items[foundIndex] = dish
    }

    localStorage.setItem(CART_KEY, JSON.stringify(cart))
}

export const getCart = () => {
    const cart = JSON.parse(localStorage.getItem(CART_KEY))
    return cart || initCart()
}

export const clearCart = () => {
    localStorage.setItem(CART_KEY, JSON.stringify([]))
}

export const isCartEmpty = () => {
    const cart = getCart()
    return typeof cart.items === 'undefined' || (typeof cart.items !==
        'undefined' && cart.items.length === 0)
}

export const removeItemFromCart = (item) => {
    const cart = getCart()
    const index = cart.items.findIndex(
        i => i.cart_item_id === item.cart_item_id)
    if (index !== -1) {
        cart.items.splice(index, 1)
    }
    localStorage.setItem(CART_KEY, JSON.stringify(cart))
}
