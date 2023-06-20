import {useSelector} from 'react-redux';

export function useProduct() {
    const {product} = useSelector(state => state.product)

    return {
        product,
    }
}