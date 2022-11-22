import { ChevronDown, ChevronUp } from "../icons"
import {removeItem, increaseItem, decreaseItem} from '../features/cart/CartSlice'
import { useDispatch } from "react-redux"

const CartItem = ({id, img, title, price, amount }) => {
    const dispatch = useDispatch();

    const handleRemove =()=>{
        dispatch(removeItem(id))
    }

    const handleIncrease=()=>{
        dispatch(increaseItem({id}))
    }
    const handleDecrease=()=>{
        if(amount === 1){
            dispatch(removeItem(id))
            return;
        }
            dispatch(decreaseItem({ id }))

    }
    return (
    <article className="cart-item">
        <img src={img} alt={title}/>
        <div>
            <h4>{title}</h4>
            <h4 className="item-price">${price}</h4>
            <button className="remove-btn" onClick={handleRemove}>remove</button>
        </div>
        <div>
            <button className="amount-btn" onClick={handleIncrease}>
                <ChevronUp />
            </button>
            <p className="amount">{amount}</p>
            <button className="amount-btn" onClick={handleDecrease} disabled={amount<1}>
                <ChevronDown />
            </button>
        </div>
    </article>
  )
}

export default CartItem