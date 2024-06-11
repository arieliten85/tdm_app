import { CardList } from "../cards/cardList/CardList";

import { ProductoProps } from "types/types";

interface Props {
  productos: ProductoProps[];
}

export default function ProductsList({ productos }: Props) {
  return (
    <>
      <CardList productos={productos} />
    </>
  );
}
