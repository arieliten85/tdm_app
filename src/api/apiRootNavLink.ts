export const apiRootNavLink = [
  { path: '/', label: 'Inicio', exact: true },
  {
    path: '/productos',
    label: 'Productos',
    exact: false,
    subRoutes: [
      { path: '/budines', label: 'Budínes' },
      { path: '/tartas', label: 'Tartas' },
      { path: '/cookies', label: 'Cookies' },
      { path: '/tortas', label: 'Tortas' },
      { path: '/tematicas', label: 'Tortas Tematicas' },
      { path: '/letras-numerales', label: 'Tortas Numerales' },
      { path: '/casamiento', label: 'Casamiento' },
      { path: '/bautismo', label: 'Bautismo' },
    ],
  },
  // { path: "/galeria", label: "Galeria", exact: false },
  { path: '/comoComprar', label: 'Como Comprar', exact: false },
  { path: '/nosotros', label: 'Nosotros', exact: false },
];
