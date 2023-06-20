import { useSelector } from 'react-redux';

export function useCart() {
    const { cart } = useSelector(state => state.cart)
    return {
        cart
    }
}