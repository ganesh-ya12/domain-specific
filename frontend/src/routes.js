// // routes.js
// import { Home } from './components/Home';
// import {  Documentation } from './components/Documentation';
// import {  About } from './components/About';
// import { Contact } from './components/Contact';
// import { Home } from './components/Home';
// import ChatBot from './components/ChatBot';
// import Dashboard from './components/Dashboard';

// export const routes = [
//   {
//     path: '/',
//     component: Home,
//     isPrivate: false,
//     label: 'Home'
//   },
//   {
//     path: '/chat',
//     component: ChatBot,
//     isPrivate: false,
//     label: 'Chat'
//   },
//   {
//     path: '/docs',
//     component: Documentation,
//     isPrivate: false,
//     label: 'Documentation'
//   },
//   {
//     path: '/about',
//     component: About,
//     isPrivate: false,
//     label: 'About'
//   },
//   {
//     path: '/contact',
//     component: Contact, 
//     isPrivate: false,
//     label: 'Contact'
//   },
//   {
//     path: '/dashboard',
//     component: Dashboard,
//     isPrivate: true,
//     label: 'Dashboard'
//   }
// ];

// // Navigation configuration
// export const navLinks = routes.filter(route => !route.isPrivate && route.path !== '/');

// // Helper to check if route is active
// export const isActiveRoute = (path, currentPath) => {
//   if (path === '/') {
//     return currentPath === '/';
//   }
//   return currentPath.startsWith(path);
// };