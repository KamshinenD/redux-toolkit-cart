import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartContainer from "./components/CartContainer";
import Modal from "./components/Modal";
import Navbar from "./components/Navbar";
import { calculateTotals, getCartItems } from "./features/cart/CartSlice";


function App() {
  const {cartItems, isLoading} = useSelector((state)=> state.cart)
  const {modalIsOpen} = useSelector((state)=>state.modal)
  const dispatch = useDispatch();

    useEffect(()=>{
      dispatch(calculateTotals())
    }, [cartItems, dispatch])

    useEffect(()=>{
      dispatch(getCartItems());
    }, [dispatch])

    if(isLoading){
      return <div className="loading">
        <h1>Loading...</h1>
        </div>
    }
  return (
    <main>
      {modalIsOpen && <Modal />}
      <Navbar />
      <CartContainer />
    </main>
  );
}
export default App;
