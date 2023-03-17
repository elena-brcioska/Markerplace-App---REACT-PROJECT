import React, { useReducer } from "react";
import { createContext } from "react";

export const CartContext = createContext();

export const Context = (props) => {
  const reducer = (state, action) => {
    switch (action.type) {
      case "ADD":
        action.payload.quantity = 1;
        const temp = state.filter(
          (product) => product.id === action.payload.id
        );

        if (temp.length > 0) {
          return state;
        } else {
          return [...state, action.payload];
        }

      case "REMOVE_ALL":
        state = [];
        return state;

      case "INCREASE":
        const increseState = state.map((item) => {
          if (item.id === action.payload.id) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        });

        return increseState;

        return removedItemState;
      case "DECREASE":
        if (action.payload.quantity > 1) {
          const decreaseState = state.map((item) => {
            if (item.id === action.payload.id) {
              return { ...item, quantity: item.quantity - 1 };
            }
            return item;
          });

          return decreaseState;
        }

      case "REMOVE":
        const removedItemState = state.filter((item) => {
          if (item.id !== action.payload.id) {
            return item;
          }
        });

        return removedItemState;

      case "GET_FROM_LOCALSTORAGE":
        state = action.payload;
        return state;

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, []);

  const info = { state, dispatch };

  return (
    <CartContext.Provider value={info}>{props.children}</CartContext.Provider>
  );
};

export default Context;
