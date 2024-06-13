import { CardList } from "../cards/cardList/CardList";

import { ApiProductoProps } from "types/types";

interface Props {
  productos: ApiProductoProps[];
}

export default function ProductsList({ productos }: Props) {
  return (
    <>
      <CardList productos={productos} />
    </>
  );
}
