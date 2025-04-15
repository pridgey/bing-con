import { createSignal, Show, type Component } from "solid-js";

import styles from "./App.module.css";
import { Confetti } from "./Confetti";

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
  "Anime (Last 10 Years) Cosplay",
  "Anime (Last 5 Years) Cosplay",
  "Anime (Last 1 Year) Cosplay",
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
  "Spiderman Cosplay",
  "Miles Morales Cosplay",
  "Marvel Cosplay",
  "Family Cosplay",
  "Demon Slayer Cosplay",
  "Video Game Cosplay",
  "Only 1 Cosplay in Group",
  "Random Horror Movie Merch",
  "Asks for different size",
  "Asks for obscure character art",
  "Asks for a discount",
  "Asks for a commission",
  "Sonic The Hedgehog Cosplay",
  "Disney Cosplay",
  "Super Mario Cosplay",
  "Cosplay with a sign",
  "Cosplay with a pet",
  "See character 5+ times (diff people)",
  "Receive item from cosplayer",
  "Cosplayer does good impression",
  "Cosplayer does bad impression",
  "Cartoon Cosplay",
  "Steven Universe Cosplay",
  "Adventure Time Cosplay",
  "Rick and Morty Cosplay",
  "TV Show / Movie Cosplay",
  "Video Game that is also a TV Show Cosplay",
  "Cosplay with a cape",
  "Legend of Zelda Cosplay",
  "Final Fantasy Cosplay",
  "Kingdom Hearts Cosplay",
  "Shirt with Pun",
  "Shirt covered with Pokemon",
  "Shirt with Collage of Faces",
  "Metal T-Shirt",
  "More than 3 Keychains on an item",
  "Visited by Another Vendor",
  "Holding a Large Plushie",
  "ITA Bag Covered in Pins",
  "Fallout Cosplay",
  "Person Getting Pulled Away",
  "Someone Overstays Their Welcome",
  "Arcane Cosplay",
  "Dan Da Dan Cosplay",
  "Just a Tail Cosplay",
  "Single Day Badge",
  "VIP Badge",
  "Weekend Badge",
  "Baby's First Convention",
  "Nerdy Hat",
  "Pulling a Wagon",
  "Volunteer Staff",
  "Someone Left Something Behind",
  "Nerdy Tattoo",
  "Dirty Tattoo",
  "Cool Tattoo",
  "Abstract Tattoo",
  "Big Wig",
  "Lolita",
  "Gyaru",
  "Takes a Photo Without Asking",
];

type BingoSquare = {
  ID: number;
  Label: string;
  Checked: boolean;
  Column: number;
  Row: number;
};

const App: Component = () => {
  // Get board from storage if it exists
  const storageBoard = window.localStorage.getItem("board") ?? "[]";
  // Create a signal for the board items, default to storage if exists
  const [boardItems, setBoardItems] = createSignal<BingoSquare[]>(
    JSON.parse(storageBoard)
  );
  // Whether the board is in a win state
  const [win, setWin] = createSignal(false);

  // Function to check for win
  const checkForWin = (boardState: BingoSquare[]) => {
    let win = false;
    // Check all columns and rows
    for (let i = 0; i <= 4; i++) {
      const row = boardState.filter((item) => item.Row === i);
      const column = boardState.filter((item) => item.Column === i);
      console.log("Row and Column", { i, row, column });
      if (
        row.every((item) => item.Checked === true) ||
        column.every((item) => item.Checked === true)
      ) {
        win = true;
        break;
      }
    }
    // Check diagonals
    if (!win) {
      const diagonalSelections = [0, 6, 12, 18, 24];
      const diagonal = boardState.filter((item) =>
        diagonalSelections.includes(item.ID)
      );
      const altDiagonalSelections = [4, 8, 12, 16, 20];
      const altDiagonal = boardState.filter((item) =>
        altDiagonalSelections.includes(item.ID)
      );
      win =
        diagonal.every((item) => item.Checked) ||
        altDiagonal.every((item) => item.Checked);
    }
    setWin(win);
  };

  // Function to generate the board
  const generateBoard = () => {
    // Sort all terms randomly
    const shuffledTerms = allTerms.sort(() => Math.random() - 0.5);
    // Create a board from the first 25 terms
    const board = shuffledTerms.slice(0, 25);

    // Convert to full types
    const boardSquares: BingoSquare[] = board.map((labelString, index) => ({
      Checked: false,
      Column: index % 5,
      ID: index,
      Label: labelString,
      Row: Math.floor(index / 5),
    }));

    // Set the board items and checked items
    setBoardItems(boardSquares);
    // Save the board to local storage
    window.localStorage.setItem("board", JSON.stringify(boardSquares));
    // Reset win
    setWin(false);
  };

  // If the board is empty, generate a new one
  if (storageBoard === "[]") {
    generateBoard();
  } else {
    checkForWin(boardItems());
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
        {boardItems().map((item, index) => (
          <button
            classList={{
              [styles.cell]: true,
              [styles.selected]: item.Checked,
            }}
            onclick={() => {
              // Get items
              const currentItems = boardItems();
              // Create new object
              const updatedItem = {
                ...item,
                Checked: !item.Checked,
              };
              // Update on item list
              currentItems[item.ID] = updatedItem;
              // Update state
              setBoardItems([...currentItems]);
              // Update local storage
              window.localStorage.setItem(
                "board",
                JSON.stringify(currentItems)
              );

              // Check for win
              checkForWin(currentItems);
            }}
          >
            {item.Label}
          </button>
        ))}
      </div>
      <Show when={win()}>
        <Confetti />
      </Show>
    </main>
  );
};

export default App;
