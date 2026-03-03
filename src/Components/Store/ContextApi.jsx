import { createContext, useContext, useReducer, useEffect } from "react";
import { toast } from "react-toastify";
const CartContext = createContext();

const initialState = {
  cartItems: JSON.parse(localStorage.getItem("cart")) || [],
  // isAuthenticated: !!localStorage.getItem("token"), same line below
  isAuthenticated: localStorage.getItem("token") ? true : false,
  currentUser: JSON.parse(localStorage.getItem("loggedInUser")) || null,
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
      return { ...state, isAuthenticated: true, currentUser: action.payload };

    case "LOGOUT":
      return { ...state, isAuthenticated: false, currentUser: null };

    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // ✅ UPDATED LOGIN FUNCTION
  const login = (token, userData) => {
    localStorage.setItem("token", token);
    localStorage.setItem("loggedInUser", JSON.stringify(userData));

    dispatch({
      type: "LOGIN",
      payload: userData, // 🔥 send user to reducer
    });
  };
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    // 🔥 for multi-tab sync
    localStorage.setItem("logout", Date.now());
    dispatch({ type: "LOGOUT" });
    toast.error("Please login again.");
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.cartItems));
  }, [state.cartItems]);
  // 🔥 ADD THIS FOR MULTI TAB LOGOUT
  useEffect(() => {
    const syncAuth = (event) => {
      if (event.key === "token") {
        if (event.newValue) {
           const user = JSON.parse(localStorage.getItem("loggedInUser"));
          dispatch({ type: "LOGIN", payload: user });
          
        } else {
          dispatch({ type: "LOGOUT" });
        }
      }
    };

    window.addEventListener("storage", syncAuth);

    return () => {
      window.removeEventListener("storage", syncAuth);
    };
  }, []);

  const objValue = {
    cartItems: state.cartItems,
    dispatch,
    isAuthenticated: state.isAuthenticated,
    login,
    logout,
    currentUser: state.currentUser,
  };

  return (
    <CartContext.Provider value={objValue}>{children}</CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
