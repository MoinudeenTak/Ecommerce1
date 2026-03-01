import {
  createContext,
  useContext,
  useReducer,
  useEffect,
} from "react";

const CartContext = createContext();

const initialState = {
  cartItems: JSON.parse(localStorage.getItem("cart")) || [],
  // isAuthenticated: !!localStorage.getItem("token"), same line below
  isAuthenticated: localStorage.getItem("token") ? true : false,
};

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_TO_CART":
      const itemExists = state.cartItems.find(
        (item) => item.id === action.payload.id
      );

      if (itemExists) {
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }

      return {
        ...state,
        cartItems: [...state.cartItems, { ...action.payload, quantity: 1 }],
      };

    case "REMOVE_FROM_CART":
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => item.id !== action.payload),
      };

    case "LOGIN":
      return { ...state, isAuthenticated: true };

    case "LOGOUT":
      return { ...state, isAuthenticated: false };

    default:
      return state;
  }
}

export function CartProvider({ children }) {
 
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const login = (token) => {
    localStorage.setItem("token", token);
    dispatch({ type: "LOGIN" });
  };

  const logout = () => {
    localStorage.removeItem("token");

    // 🔥 for multi-tab sync
    localStorage.setItem("logout", Date.now());

    dispatch({ type: "LOGOUT" });
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.cartItems));
  }, [state.cartItems]);

  const objValue = {
    cartItems: state.cartItems,
    dispatch,
    isAuthenticated: state.isAuthenticated,
    login,
    logout,
  };

  return (
    <CartContext.Provider value={objValue}>{children}</CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
