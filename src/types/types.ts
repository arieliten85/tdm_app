// export interface ProductoProps {
//   id: string | number;
//   img: string;
//   title: string;
//   description: string;
//   price: string;
//   tags?: string[];
// }

export interface ApiProductoProps {
  id: string | number;
  image: string;
  title: string;
  description: string;
  price: string;
  tags?: string[];
  category?: string;
  optionalImages?: { image: string }[];
}

export interface ApiProductos {
  productos: ApiProductoProps[];
}

// export interface Productos {
//   productos: ProductoProps[];
// }
export interface CounterProps {
  count: number;

  increment: () => void;
  decrement: () => void;
}

export interface buyProductProps {
  image: string;
  title: string;
  description: string;
  price: string;
  tags?: string[];
  count?: number;
  increment?: () => void;
  decrement?: () => void;
}

// CONTEXTO
