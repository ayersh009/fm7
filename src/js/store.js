import { createStore } from "framework7/lite";
import Papa from "papaparse";
import { supabase } from "../components/supabase";

const store = createStore({
  state: {
    orders: [],
  },
  getters: {
    orders({ state }) {
      return state.orders;
    },
    getOrderById: (state) => (memeID) => {
      return state.orders.find((order) => order.memeID === memeID);
    },
  },
  actions: {
    async fetchOrders({ state }) {
      const today = new Date();
      const last7Days = new Date(today);
      last7Days.setDate(today.getDate() - 7);

      const { data, error } = await supabase
        .from("ordermanager")
        .select("*")
        .gte("orderdate", last7Days.toISOString())
        .order("orderdate", { ascending: false });

      if (error) {
        console.error("Error fetching orders:", error);
      } else {
        state.orders = data;
      }
    },
    async fetchOrderById({ state }, memeID) {
      const { data, error } = await supabase
        .from("ordermanager")
        .select("*")
        .eq("memeID", memeID)
        .single();
      if (error) {
        console.error("Error fetching order details:", error);
      }
      return data;
    },
  },
});

export default store;
