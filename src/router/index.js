import { createWebHistory, createRouter } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../pages/Home.vue'),
  },

  {
    path: '/collections/:id',
    name: 'ProductDetail',
    component: () => import('../pages/ProductDetail.vue'),
    props: true
  },
  {
    path: '/assets/create',
    name: 'CreateItem',
    component: () => import('../pages/CreateItem.vue')
  },
  {
    path: '/assets/edit/:title/:collection',
    name: 'EditItem',
    component: () => import('../pages/EditItem.vue')
  },
  {
    path: '/assets/edit',
    name: 'EditItem',
    component: () => import('../pages/EditItem.vue')
  },
  {
    path: '/assets/:address/:tokenid/:formatedTitle',
    name: 'itemDetails',
    component: () => import('../pages/ItemDetails.vue')
  },
  {
    path: '/explore',
    name: 'explore',
    component: () => import('../pages/Explore.vue')
  },
  {
    path: '/buyticket',
    name: 'BuyTicket',
    component: () => import(`../pages/BuyTicket.vue`)
  },
  {
    path: '/myticket',
    name: 'MyTicket',
    component: () => import(`../pages/MyTicket.vue`)
  },
  {
    path: '/user/:walletAddress',
    name: 'author',
    component: () => import('../pages/Author.vue')
  },
  {
    path: '/about-us',
    name: 'AboutUs',
    component: () => import('../pages/AboutUs.vue')
  },
  {
    path: '/activity',
    name: 'activity',
    component: () => import('../pages/Activity.vue')
  },
  {
    path: '/ranking',
    name: 'ranking',
    component: () => import('../pages/Ranking.vue')
  },
  {
    path: '/blog',
    name: 'blog',
    component: () => import('../pages/Blog.vue')
  },
  {
    path: '/blog-detail-:id',
    name: 'NewsDetail',
    component: () => import('../pages/NewsDetail.vue'),
  },
  {
    path: '/blog-detail',
    name: 'blog-details',
    component: () => import('../pages/BlogDetail.vue')
  },
  {
    path: '/connect',
    name: 'connect',
    component: () => import('../pages/connect.vue')
  },
  {
    path: '/request',
    name: 'activity',
    component: () => import('../pages/request.vue')
  },
  {
    path: '/purchases-sales',
    name: 'purchases-sales',
    component: () => import('../pages/PurchasesSales.vue')
  },
  {
    path: '/favorites',
    name: 'Favorites',
    component: () => import('../pages/Friendlist.vue')
  },
  {
    path: '/my-friends',
    name: 'MyFriends',
    component: () => import('../pages/MyFriends.vue')
  },
  {
    path: '/Blocklist',
    name: 'Blocklist',
    component: () => import('../pages/Blocklist.vue')
  },
  {
    path: '/addfriend',
    name: 'addfriend',
    component: () => import('../pages/Addfriend.vue')
  },
  {
    path: '/addblock',
    name: 'addblock',
    component: () => import('../pages/Addblock.vue')
  },
  {
    path: '/redeem',
    name: 'redeem',
    component: () => import('../pages/Redeem.vue')
  },
  {
    path: '/deposit-enfties',
    name: 'deposit-enfties',
    component: () => import('../pages/DepositEnfties.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('../pages/Profile.vue')
  },
  {
    path: '/account',
    name: 'account',
    component: () => import('../pages/Account.vue')
  },
  {
    path: '/payment-methods',
    name: 'payment-methods',
    component: () => import('../pages/PaymentMethods.vue')
  },
  {
    path: '/seller-settings',
    name: 'seller-settings',
    component: () => import('../pages/SellerSettings.vue')
  },
  {
    path: '/notifications',
    name: 'notifications',
    component: () => import('../pages/Notifications.vue')
  },
  {
    path: '/security',
    name: 'security',
    component: () => import('../pages/Security.vue')
  },
  {
    path: '/avatar',
    name: 'avatar',
    component: () => import('../pages/Avatar.vue')
  },
  {
    path: '/party',
    name: 'party',
    component: () => import('../pages/Party.vue')
  },
  {
    path: '/collections/create',
    name: 'create',
    component: () => import('../pages/Create.vue')
  },
  {
    path: '/collections/create-single',
    name: 'CreateSingle',
    component: () => import('../pages/CreateSingle.vue')
  },
  {
    path: '/collections/create-multiple',
    name: 'create-multiple',
    component: () => import('../pages/CreateMultiple.vue')
  },
  {
    path: '/create',
    name: 'create',
    component: () => import('../pages/Create.vue')
  },
  {
    path: '/collections',
    name: 'collections',
    component: () => import(`../pages/Collections.vue`)
  },
  {
    path: '/assets/:collection',
    name: 'ExploreCollection',
    component: () => import(`../pages/ExploreCollection.vue`),
  },
  {
    path: '/assets/:collection',
    name: 'BetaExploreCollection',
    component: () => import(`../pages/BetaExploreCollection.vue`),
  },
  {
    path: '/offers',
    name: 'Offer',
    component: () => import('../pages/Offers.vue')
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import('../pages/Contact.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/pages/NotFound'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return {
        left: 0,
        top: 0
      };
    }
  }
});

export default router;
