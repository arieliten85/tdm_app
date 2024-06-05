import { CardList } from "../components/cards/cardList/CardList";
import { useSearchContext } from "../context/SearchContextProps ";

export default function SearchResults() {
  const { searchResults } = useSearchContext();

  if (!searchResults.length) {
    return (
      <div className="flex-center-column">
        <h1
          className=" text-center mt-5    p-3 text-white "
          style={{
            backgroundColor: "#c69b739e",
            textTransform: "uppercase",
            fontSize: "15px",
          }}
        >
          sin resultados
        </h1>
      </div>
    );
  }

  return (
    <>
      <div className="flex-center-column">
        <CardList productos={searchResults} />
      </div>
    </>
  );
}
