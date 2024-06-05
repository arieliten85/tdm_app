export interface ProductoProps {
  id: string;
  img: string;
  title: string;
  description: string;
  price: string;
  tags?: string[];
}

export interface CounterProps {
  count: number;

  increment: () => void;
  decrement: () => void;
}

export interface buyProductProps {
  img: string;
  title: string;
  description: string;
  price: string;
  tags?: string[];
  count?: number;
  increment?: () => void;
  decrement?: () => void;
}
