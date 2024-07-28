import { createStore } from 'framework7/lite'
import Papa from 'papaparse'
import { supabase } from '../components/supabase'

const fetchOrders = async () => {
  let { data, error } = await supabase.from('orderhead').select('*')

  if (error) {
    console.error('Error fetching orders:', error)
    return []
  } else {
    return data
  }
}

const addOrder = async order => {
  const { data, error } = await supabase.from('orderhead').insert([order])

  if (error) {
    console.error('Error adding order:', error)
    return null
  } else if (data && data.length > 0) {
    return data[0]
  } else {
    console.error('Unexpected response:', data)
    return null
  }
}

const store = createStore({
  state: {
    ordersold: [],
    orders: []
  },
  getters: {
    orders ({ state }) {
      return state.orders
    },
    getOrderById: state => memeID => {
      return state.orders.find(order => order.memeID === memeID)
    },
    pendingOrders ({ state }) {
      return state.orders.filter(
        order => order.status === 'In Process' || order.status === 'Reported'
      )
    },
    completedOrders ({ state }) {
      return state.orders.filter(order => order.status === 'Loaded')
    }
  },
  actions: {
    async loadOrders ({ state }) {
      state.orders = await fetchOrders()
    },
    async addOrder ({ state }, order) {
      const newOrder = await addOrder(order)
      if (newOrder) {
        state.orders = [...state.orders, newOrder]
      }
    },

    async fetchOrdersold ({ state }) {
      const today = new Date()
      const last7Days = new Date(today)
      last7Days.setDate(today.getDate() - 7)

      const { data, error } = await supabase
        .from('ordermanager')
        .select('*')
        .gte('orderdate', last7Days.toISOString())
        .order('orderdate', { ascending: false })

      if (error) {
        console.error('Error fetching orders:', error)
      } else {
        state.orders = data
      }
    },
    async fetchOrderById ({ state }, memeID) {
      const { data, error } = await supabase
        .from('ordermanager')
        .select('*')
        .eq('memeID', memeID)
        .single()
      if (error) {
        console.error('Error fetching order details:', error)
      }
      return data
    }
  }
})

export default store
