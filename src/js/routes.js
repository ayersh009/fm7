
import HomePage from '../pages/home.jsx';
import AboutPage from '../pages/about.jsx';
import FormPage from '../pages/form.jsx';
import CatalogPage from '../pages/stock/catalog.jsx';
import ProductPage from '../pages/product.jsx';
import SettingsPage from '../pages/settings.jsx';

import DynamicRoutePage from '../pages/dynamic-route.jsx';
import RequestAndLoad from '../pages/request-and-load.jsx';
import NotFoundPage from '../pages/404.jsx';
import CsvPage from '../pages/stock/CsvPage.jsx'
import MovePage from '../pages/stock/move.jsx'
import OrderPage from '../pages/order/norder.jsx';
import DetailPage from '../pages/stock/palletdetails.jsx';
import OrderDetailsPage from '../pages/order/orderdetails.jsx';
import MaterialIssueList from '../pages/materialissue/list.jsx'
import MaterialSingleRecord from '../pages/materialissue/singlerecord.jsx'
import InsertMaterialIssueRecordPage from '../pages/materialissue/insert.jsx';
import EditRecordPage from '../pages/materialissue/EditRecordPage.jsx';

//stock
import StockSummaryPage from '../pages/stock/stocksummary.jsx';


var routes = [
  {
    path: '/',
    component: HomePage,
  },
  {
    path: '/materialissuelist/',
    component: MaterialIssueList,
  },

  {
    path: '/stocksummary/',
    component: StockSummaryPage,
  },
  {
    path: '/materialissueinsert/',
    component: InsertMaterialIssueRecordPage,
  },
  {
    path: '/materialissuesinglerecord/:item',
    component: MaterialSingleRecord,
  },
  {
    path: '/edit-record/:item',
    component: EditRecordPage,
  },
  {
    path: '/orderdetails/:order',
    component: OrderDetailsPage,
  },

  {
    path: '/about/',
    component: AboutPage,
  },
  {
    path: '/form/',
    component: FormPage,
  },
  {
    path: '/catalog/',
    component: CatalogPage,
  },
  {
    path: '/product/:id/',
    component: ProductPage,
  },
  {
    path: '/detail/:item',
    component: DetailPage,
  },
  {
    path: '/csv/', // Add the new route
    component: CsvPage,
  },
  {
    path: '/settings/',
    component: SettingsPage,
  },
  {
    path: '/move/',
    component: MovePage,
  },
  {
    path: '/order/',
    component: OrderPage,
  },

  {
    path: '/dynamic-route/blog/:blogId/post/:postId/',
    component: DynamicRoutePage,
  },
  {
    path: '/request-and-load/user/:userId/',
    async: function ({ router, to, resolve }) {
      // App instance
      var app = router.app;

      // Show Preloader
      app.preloader.show();

      // User ID from request
      var userId = to.params.userId;

      // Simulate Ajax Request
      setTimeout(function () {
        // We got user data from request
        var user = {
          firstName: 'Vladimir',
          lastName: 'Kharlampidi',
          about: 'Hello, i am creator of Framework7! Hope you like it!',
          links: [
            {
              title: 'Framework7 Website',
              url: 'http://framework7.io',
            },
            {
              title: 'Framework7 Forum',
              url: 'http://forum.framework7.io',
            },
          ]
        };
        // Hide Preloader
        app.preloader.hide();

        // Resolve route to load page
        resolve(
          {
            component: RequestAndLoad,
          },
          {
            props: {
              user: user,
            }
          }
        );
      }, 1000);
    },
  },
  {
    path: '(.*)',
    component: NotFoundPage,
  },
];

export default routes;
