const reducer = (state, action) => {
    if (action.type === 'CLEAR_CART') {
        return { ...state, cart: [] };
    }
    if (action.type === 'REMOVE_ITEM') {
        return { ...state, cart: state.cart.filter((item) => item.id !== action.payload) }
    }
    if (action.type === 'TOGGLE_ITEM') {
        let tempCart = state.cart.map((cartItem) => {
            if (cartItem.id === action.payload.id) {
                if (action.payload.type === 'increment') {
                    return { ...cartItem, amount: cartItem.amount + 1 }
                }
                if (action.payload.type === 'decrement') {
                    return { ...cartItem, amount: cartItem.amount - 1 }
                }
            }
            return cartItem;
        }).filter((cartItem) => cartItem.amount !== 0)
        return { ...state, cart: tempCart }
    }

    // if (action.type === 'INCREMENT_ITEM') {
    //     let tempCart = state.cart.map((cartItem) => {
    //         if (cartItem.id === action.payload) {
    //             return { ...cartItem, amount: cartItem.amount + 1 }
    //         }
    //         return cartItem;
    //     })
    //     return { ...state, cart: tempCart }
    // }
    // if (action.type === 'DECREMENT_ITEM') {
    //     let tempCart = state.cart.map((cartItem) => {
    //         if (cartItem.id === action.payload) {
    //             return { ...cartItem, amount: cartItem.amount - 1 }
    //         }
    //         return cartItem;
    //     }).filter((cartItem) => cartItem.amount !== 0)
    //     return { ...state, cart: tempCart }
    // }
    if (action.type === 'GET_TOTALS') {

        const { total, amount } = state.cart.reduce((cartTotal, cartItem) => {
            const { price, amount } = cartItem;
            const itemTotal = price * amount;
            cartTotal.total += itemTotal;
            cartTotal.amount += amount;
            console.log(cartTotal);
            return cartTotal;
        }, { total: 0, amount: 0 })
        return { ...state, total, amount }
    }
    if (action.type === 'LOADING') {
        return { ...state, loading: true }
    }
    if (action.type === 'DISPLAY_ITEMS') {
        return { ...state, cart: action.payload, loading: false }
    }
    //throw error if no action type matches
    throw new Error('no matching action type');
}

export default reducer;