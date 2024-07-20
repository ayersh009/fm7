import OrdersList from '../memento/orderlist.jsx'
import AddOrder from './AddOrder.jsx'

const ordersRoutes = [
  {
    path: '/memeorderlist/',
    component: OrdersList
  },
  {
    path: '/add-order/',
    component: AddOrder,
  },
]

export default ordersRoutes
