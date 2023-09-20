import { createRouter, createWebHistory } from 'vue-router';

import Asset from '../views/asset/Asset';
import AssetHTDB from '../views/assetHTDB/AssetHTDB';
import Category from '../views/category/Category'
import Overview from '../views/overview/Overview'
import Report from '../views/report/Report'
import Search from '../views/search/Search'
import Tools from '../views/tools/Tools'
const routes = [
  {
    path: '/',
    component: Asset
  },
  {
    path: '/asset',
    component: Asset
  }
  ,
  {
    path: '/assetHTDB',
    component: AssetHTDB
  }
  ,
  {
    path: '/category',
    component: Category
  }
  ,
  {
    path: '/overview',
    component: Overview
  }
  ,
  {
    path: '/report',
    component: Report
  }
  ,
  {
    path: '/search',
    component: Search
  },
  {
    path: '/tools',
    component: Tools
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
