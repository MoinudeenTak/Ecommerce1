import { createContext, useContext, useReducer, useEffect } from "react";
import { toast } from "react-toastify";
const CartContext = createContext();

const initialState = {
  cartItems: [],
  // isAuthenticated: !!localStorage.getItem("token"), same line below
  // isAuthenticated: localStorage.getItem("token") ? true : false, for local storage
  isAuthenticated: sessionStorage.getItem("token") ? true : false,
  // currentUser: JSON.parse(localStorage.getItem("loggedInUser")) || null, for local storage
  currentUser: JSON.parse(sessionStorage.getItem("loggedInUser")) || null,
  orders: JSON.parse(localStorage.getItem("orders")) || [],
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
    case "SET_CART":
      return {
        ...state,
        cartItems: action.payload,
      };
    case "CLEAR_CART":
      return {
        ...state,
        cartItems: [],
      };
    case "INCREASE_QTY":
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.id === action.payload && item.quantity < item.stock
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };
    case "DECREASE_QTY":
      return {
        ...state,
        cartItems: state.cartItems
          .map((item) =>
            item.id === action.payload
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
          .filter((item) => item.quantity > 0),
      };
    case "ADD_ORDER":
      const updatedOrders = [...state.orders, action.payload];
      localStorage.setItem("orders", JSON.stringify(updatedOrders));
      return {
        ...state,
        orders: updatedOrders,
      };
      case "UPDATE_ORDER_STATUS":
  return {
    ...state,
    orders: state.orders.map((order) =>
      order.id === action.payload.id
        ? { ...order, status: action.payload.status }
        : order
    ),
  };
    case "LOGIN":
      return { ...state, isAuthenticated: true, currentUser: action.payload };

    case "LOGOUT":
      return {
        ...state,
        isAuthenticated: false,
        currentUser: null,
        cartItems: [],
      };

    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  useEffect(() => {
    if (!state.currentUser) return;

    const storedCart = localStorage.getItem(`cart_${state.currentUser.email}`);

    if (storedCart) {
      dispatch({
        type: "SET_CART",
        payload: JSON.parse(storedCart),
      });
    }
  }, [state.currentUser]);

  // ✅ UPDATED LOGIN FUNCTION
  const login = (token, userData) => {
    // localStorage.setItem("token", token);
    // localStorage.setItem("loggedInUser", JSON.stringify(userData));
    sessionStorage.setItem("loggedInUser", JSON.stringify(userData));
    sessionStorage.setItem("token", "token");

    dispatch({
      type: "LOGIN",
      payload: userData, // 🔥 send user to reducer
    });
  };
  const logout = () => {
    // localStorage.removeItem("token");
    // localStorage.removeItem("loggedInUser");
    sessionStorage.removeItem("token");
sessionStorage.removeItem("loggedInUser");
    // 🔥 for multi-tab sync
    localStorage.setItem("logout", Date.now());
    dispatch({ type: "LOGOUT" });
    toast.error("Please login again.");
  };

  useEffect(() => {
    if (state.currentUser) {
      localStorage.setItem(
        `cart_${state.currentUser.email}`,
        JSON.stringify(state.cartItems)
      );
    }
  }, [state.cartItems, state.currentUser]);
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
    orders: state.orders,
  };

  return (
    <CartContext.Provider value={objValue}>{children}</CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
