import { createContext, useState, useContext } from 'react';
import CartModal from './components/CartModal';

// create Context
const itemContext = createContext();

function useValue() {
  const value = useContext(itemContext);
  return value;
}

// custom provider:- Component :- make use of default provider
function CustomItemContext({ children }) {
  const [total, setTotal] = useState(0);
  const [item, setItem] = useState(0);
  const [showCart, setShowCart] = useState(false);
  const [cart, setCart] = useState([]);

  const handleAdd = (prod) => {
    const index = cart.findIndex((item) => item.id === prod.id);
    if (index === -1) {
      setCart([...cart, { ...prod, qty: 1 }]);

      setTotal(total + prod.price);
    } else {
      cart[index].qty++;
      setCart(cart);
      console.log(cart);
      setTotal(total + cart[index].price);
    }
    setItem(item + 1);
  };

  const handleRemove = (id) => {
    const index = cart.findIndex((item) => item.id === id);
    if (index !== -1) {
      cart[index].qty--;
      setItem(item - 1);
      setTotal(total - cart[index].price);
      if (cart[index].qty === 0) {
        cart.splice(index, 1);
      }
    }
    setCart(cart);
  };

  const handleReset = () => {
    setTotal(0);
    setItem(0);
    setCart([]);
  };

  const toggle = () => {
    setShowCart(!showCart);
  };

  return (
    <itemContext.Provider
      value={{
        item,
        total,
        handleAdd,
        handleRemove,
        handleReset,
        toggle,
        cart,
      }}
    >
      {showCart && <CartModal toggle={toggle} />}
      {children}
    </itemContext.Provider>
  );
}

// named export
export { itemContext, useValue };
export default CustomItemContext;
