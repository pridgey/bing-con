import { createSignal, type Component } from "solid-js";

import styles from "./App.module.css";

const allTerms = [
  "Frieren Cosplay",
  "BL Couple Cosplay",
  "My Hero Academia Cosplay",
  "Furry Cosplay",
  "Fully Obscured Cosplay",
  "Looks but doesn't buy",
  "Takes a business card",
  "Maid Cosplay",
  "Wow that's a lot of skin",
  "Sexy Genderbend Cosplay",
  "Helluva Boss Cosplay",
  "Hazbin Hotel Cosplay",
  "90's Anime Cosplay",
  "Last Minute Cosplay",
  "Last 5 years Anime Cosplay",
  "Clearly homemade Cosplay",
  "Group Cosplay (3 or more)",
  "Baldur's Gate Cosplay",
  "Someone takes photo in your aisle",
  "Genshin Impact Cosplay",
  "Asks for online store",
  "Jujutsu Kaisen Cosplay",
  "Cosplay with props",
  "Cosplay props with electronics",
  "Cosplay with extra large prop",
  "Views table in silence, doesn't buy",
  "Cosplay with wings",
  "Cosplay with moving parts",
  "Hololive/Vtuber Cosplay",
  "Chainsaw Man Cosplay",
  "Pokemon Cosplay (not trainer)",
  "Pokemon Trainer Cosplay",
  "Star Wars Cosplay",
  "Princess Cosplay",
];

const App: Component = () => {
  // Get board from storage if it exists
  const storageBoard = window.localStorage.getItem("board") ?? "[]";
  // Create a signal for the board items, default to storage if exists
  const [boardItems, setBoardItems] = createSignal<string[]>(
    JSON.parse(storageBoard)
  );

  // Get checked items from storage if they exist
  const storageCheckedItems =
    window.localStorage.getItem("checkedItems") ?? "[]";
  // Create a signal for any checked items
  const [checkedItems, setCheckedItems] = createSignal<string[]>(
    JSON.parse(storageCheckedItems)
  );

  // Function to generate the board
  const generateBoard = () => {
    // Sort all terms randomly
    const shuffledTerms = allTerms.sort(() => Math.random() - 0.5);
    // Create a board from the first 25 terms
    const board = shuffledTerms.slice(0, 25);
    // Set the board items and checked items
    setBoardItems(board);
    setCheckedItems([]);
    // Save the board to local storage
    window.localStorage.setItem("board", JSON.stringify(board));
    window.localStorage.setItem("checkedItems", JSON.stringify([]));
  };

  // If the board is empty, generate a new one
  if (storageBoard === "[]") {
    generateBoard();
  }

  return (
    <main class={styles.main}>
      <h1 class={styles.title}>Bing-Con</h1>
      <h2 class={styles.subtitle}>Convention Bingo Board</h2>
      <button
        onClick={() => {
          if (
            confirm(
              "Are you sure you want to generate a new board? Any progress on this board will be lost"
            )
          ) {
            generateBoard();
          }
        }}
      >
        Generate New Board
      </button>
      <div class={styles.board}>
        {boardItems().map((item) => (
          <button
            classList={{
              [styles.cell]: true,
              [styles.selected]: checkedItems().includes(item),
            }}
            onclick={() => {
              const newCheckedItems = checkedItems().includes(item)
                ? checkedItems().filter((i) => i !== item)
                : [...checkedItems(), item];
              setCheckedItems(newCheckedItems);
              window.localStorage.setItem(
                "checkedItems",
                JSON.stringify(newCheckedItems)
              );
            }}
          >
            {item}
          </button>
        ))}
      </div>
    </main>
  );
};

export default App;
