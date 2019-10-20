import React from "react";
import { Redirect } from "react-router-dom";

// Layout Types
import { DefaultLayout } from "./layouts";

// Route Views
import BlogOverviewPage from "./views/BlogOverviewPage";
import AddStock from "./views/AddStock";
import UseStock from "./views/UseStock";
import ReturnStock from "./views/ReturnStock";
import ProductListPage from "./views/ProductListPage";
import ProductDetailPage from "./views/ProductDetailPage";
import ManufacturerListPage from "./views/ManufacturerListPage";

import AddProductPage from "./views/AddProductPage";
import AddManufacturerPage from "./views/AddManufacturerPage";
import StockListPage from "./views/StockListPage";

// import Errors from "./views/Errors";

export default [
  {
    path: "/",
    exact: true,
    layout: DefaultLayout,
    component: () => <Redirect to="/overview" />
  },
  {
    path: "/overview",
    layout: DefaultLayout,
    component: BlogOverviewPage
  },
  {
    path: "/stock/add",
    layout: DefaultLayout,
    component: AddStock
  },
  {
    path: "/stock/use",
    layout: DefaultLayout,
    component: UseStock
  },
  {
    path: "/stock/return",
    layout: DefaultLayout,
    component: ReturnStock
  },
  {
    path: `/stock_list/:id`,
    exact: true,
    layout: DefaultLayout,
    component: StockListPage
  },
  {
    path: "/product",
    exact: true,
    layout: DefaultLayout,
    component: ProductListPage
  },
  {
    path: "/product/add",
    layout: DefaultLayout,
    component: AddProductPage
  },
  {
    path: `/product/change/:id`,
    exact: true,
    layout: DefaultLayout,
    component: ProductDetailPage
  },
  {
    path: "/manufacturer",
    exact: true,
    layout: DefaultLayout,
    component: ManufacturerListPage
  },
  {
    path: "/manufacturer/add",
    layout: DefaultLayout,
    component: AddManufacturerPage
  },
];
