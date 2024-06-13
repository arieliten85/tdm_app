export const apiRootNavLink = [
  { path: "/", label: "Inicio", exact: true },
  {
    path: "/productos",
    label: "Productos",
    exact: false,
    subRoutes: [
      { path: "/tortas-tematicas", label: "Tortas Tematicas" },
      { path: "/shots", label: "Shots dulces" },
      { path: "/bautismo", label: "Bautismo" },
      { path: "/casamiento", label: "Casamiento" },
    ],
  },
  // { path: "/galeria", label: "Galeria", exact: false },
  { path: "/comoComprar", label: "Como Comprar", exact: false },
  { path: "/nosotros", label: "Nosotros", exact: false },
];
