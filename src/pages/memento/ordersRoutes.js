import OrdersList from '../memento/orderlist.jsx'
import AddOrder from './AddOrder.jsx'
import SingleOrder from '../memento/SingleOrder.jsx'

const ordersRoutes = [
  {
    path: '/memeorderlist/',
    component: OrdersList
  },
  {
    path: '/add-order/',
    component: AddOrder,
  },
  {
    path: '/singleorder/:order',
    component: SingleOrder,
  },
]

export default ordersRoutes
