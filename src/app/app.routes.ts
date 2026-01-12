import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./Components/pages/home/home/home').then((m) => m.Home),
  },

  {
    path: 'about',
    loadComponent: () => import('./Components/pages/about-us-1/about-us-1').then((m) => m.AboutUs1),
  },

  {
    path: 'contact',
    loadComponent: () => import('./Components/pages/contact/contact').then((m) => m.Contact),
  },

  {
    path: 'blog',
    loadComponent: () => import('./Components/pages/blog-grid/blog-grid').then((m) => m.BlogGrid),
  },

  {
    path: 'product',
    loadComponent: () =>
      import('./Components/pages/product-single/product-single').then((m) => m.ProductSingle),
  },

  {
    path: 'cart',
    loadComponent: () => import('./Components/pages/cart/cart').then((m) => m.Cart),
  },
  {
    path: 'customerservice',
    loadComponent: () =>
      import('./Components/pages/customeService/customer-service/custome-service').then((m) => m.CustomeService),
  },
  {
    path:'referAFriend',
    loadComponent:()=>import('./Components/pages/customeService/refer-afriend/refer-afriend').then((m)=>m.ReferAFriend)
  },
  {
    path: 'checkout',
    loadComponent: () => import('./Components/pages/checkout/checkout').then((m) => m.Checkout),
  },
  {
    path: 'carrers',
    loadComponent: () => import('./Components/pages/carrers/carrers').then((m) => m.Carrers),
  },
  {
    path: 'lookbook',
    loadComponent: () => import('./Components/pages/lookbook/lookbook').then((m) => m.Lookbook),
  },
  {
    path: 'FAQ',
    loadComponent: () => import('./Components/pages/faq/faq').then((m) => m.Faq),
  },
  {
    path: 'storeLocation',
    loadComponent: () =>
      import('./Components/pages/store-location/store-location').then((m) => m.StoreLocation),
  },
 
  
  {
    path: 'shopliftfilter',
    loadComponent: () =>
      import('./Components/pages/Shop/shop-left-filter/shop-left-filter').then(
        (m) => m.ShopLeftFilter
      ),
  },
  {
    path: 'shoptopfilter',
    loadComponent: () =>
      import('./Components/pages/Shop/shop-top-filter/shop-top-filter').then(
        (m) => m.ShopTopFilter
      ),
  },
  {
    path: 'shopcanvasfilter',
    loadComponent: () =>
      import('./Components/pages/Shop/shop-canvas-filter/shop-canvas-filter').then(
        (m) => m.ShopCanvasFilter
      ),
  },
  {
    path: 'commingsoon',
    loadComponent: () =>
      import('./Components/pages/comming-soon/comming-soon').then((m) => m.CommingSoon),
  },
  {
    path: 'shopcategory',
    loadComponent: () =>
      import('./Components/pages/Shop/shop-show-category/shop-show-category').then(
        (m) => m.ShopShowCategory
      ),
  },
  {
    path: 'shopcustombanner',
    loadComponent: () =>
      import('./Components/pages/Shop/shop-custom-bunner/shop-custom-bunner').then(
        (m) => m.ShopCustomBunner
      ),
  },
  {
    path: 'shoploadmore',
    loadComponent: () =>
      import('./Components/pages/Shop/shop-load-more/shop-load-more').then((m) => m.ShopLoadMore),
  },
  {
    path: 'shopinfinity',
    loadComponent: () =>
      import('./Components/pages/Shop/shop-infinity-scrolling/shop-infinity-scrolling').then(
        (m) => m.ShopInfinityScrolling
      ),
  },
  {
    path: '**',
    loadComponent: () => import('./Components/pages/not-found/not-found').then((m) => m.NotFound),
  },
];
