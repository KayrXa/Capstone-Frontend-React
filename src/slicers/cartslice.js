import { createSlice} from "@reduxjs/toolkit";

const initialState = {
  cartitems: [],
};

const cartslice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    add: (state, action) => {
      const exist = state.cartitems.find((item) => item.mid === action.payload.mid);
      if (exist) {
        let items = state.cartitems.map((item) =>
          item.mid === action.payload.mid ? { ...exist, amount: exist.amount + 1 } : item
        );
        state.cartitems = items;
      } else {
        let newitem = { ...action.payload, amount: 1 };
        state.cartitems.push(newitem);
      }
    },
    remove: (state, action) => {
      let removeitem = action.payload;
      const exist = state.cartitems.find((item) => item.mid === removeitem.mid);
      if (exist.amount === 1) {
        state.cartitems.splice(
          state.cartitems.findIndex((item) => item.mid === removeitem.mid),
          1
        );
      } else {
        let items = state.cartitems.map((item) =>
          item.mid === removeitem.mid ? { ...exist, amount: exist.amount - 1 } : item
        );
        state.cartitems = items;
      }
    },
    removeAll: (state) => {
      state.cartitems = [];
    },
  },
});

export let cartitems = (state) => state.cartreducer.cartitems;
export let { add, remove, removeAll } = cartslice.actions;
export default cartslice.reducer;