import "./App.css";
import { useState, useEffect, Fragment } from "react";
import sheep from "./Images/sheep.png";
import moses from "./Images/moses.png";
import bald from "./Images/bald.png";

let shopIsOpen = false;

export default function App() {
  const [carrotCount, setCarrotCount] = useState(10);
  const [hunger, setHunger] = useState(100);
  const [carrotOpen, setCarrotOpen] = useState(false);
  const [treeOpen, setTreeOpen] = useState(false);
  const [money, setMoney] = useState(100);
  const [shop, setShop] = useState("invis");
  const [treevis, setTreevis] = useState("locked");
  const [treeCount, setTreeCount] = useState(0);
  const [dialogueCount, setDialogueCount] = useState(0);
  const [dialougeText, setDialogueText] = useState("im moses");
  const [mosesHere, setMosesHere] = useState("visible");
  const [isLoaded, setIsLoaded] = useState(false);
  const [SaveGameUse, setSaveGameUse] = useState("Save Game");
  const [sheepImage, setSheepImage] = useState(sheep);
  const [shearsEquipped, setShearsEquipped] = useState(false);

  useEffect(() => {
    if (!isLoaded) return;

    const saveData = {
      carrotCount,
      treeCount,
      money,
      hunger,
      treevis,
      dialogueCount,
      dialougeText,
      mosesHere,
    };

    localStorage.setItem("ezrasheepsave", JSON.stringify(saveData));
  }, [
    carrotCount,
    treeCount,
    money,
    hunger,
    treevis,
    dialogueCount,
    dialougeText,
    mosesHere,
    isLoaded,
  ]);

  const saveGame = () => {
    const saveData = {
      carrotCount,
      treeCount,
      money,
      hunger,
      treevis,
      dialogueCount,
      dialougeText,
      mosesHere,
    };

    localStorage.setItem("ezrasheepsave", JSON.stringify(saveData));
  };

  function delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  useEffect(() => {
    const savedGame = localStorage.getItem("ezrasheepsave");

    if (savedGame) {
      const data = JSON.parse(savedGame);

      setCarrotCount(data.carrotCount ?? 10);
      setTreeCount(data.treeCount ?? 0);
      setMoney(data.money ?? 100);
      setHunger(data.hunger ?? 100);
      setTreevis(data.treevis ?? "locked");
      setDialogueCount(data.dialogueCount ?? 0);
      setDialogueText(data.dialougeText ?? "im moses");
      setMosesHere(data.mosesHere ?? "visible");
    }

    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (hunger <= 0) {
      () => {
        localStorage.removeItem("ezrasheepsave");
        window.location.reload();
      };
    }

    const interval = setInterval(() => {
      setHunger((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          localStorage.removeItem("ezrasheepsave");
          window.location.reload();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [hunger]);

  const carrotClick = () => {
    if (!carrotOpen && carrotCount != 0) {
      setCarrotCount((prev) => prev - 1);
      setCarrotOpen(true);
    } else if (carrotCount != 0) {
      setCarrotCount((prev) => prev + 1);
      setCarrotOpen(false);
    } else {
      setCarrotOpen(false);
    }
  };

  const treeClick = () => {
    if (!treeOpen && treeCount != 0) {
      setTreeCount((prev) => prev - 1);
      setTreeOpen(true);
    } else if (treeCount != 0) {
      setTreeCount((prev) => prev + 1);
      setTreeOpen(false);
    } else {
      setTreeOpen(false);
    }
  };

  const consumeFood = () => {
    if (shearsEquipped && sheepImage == sheep) {
      setSheepImage(bald);
      setShearsEquipped(false);
      setMoney((prevMoney) => prevMoney + 40);
    } else if (carrotOpen) {
      setHunger((prev) => prev + 15);
      setCarrotOpen(false);
    } else if (treeOpen) {
      setHunger((prev) => prev + 35);
      setTreeOpen(false);
    }
  };

  const buyCarrots = () => {
    if (money >= 20) {
      setCarrotCount((prevCarrotCount) => prevCarrotCount + 15);
      setMoney((prevMoney) => prevMoney - 20);
    }
  };

  const buyTreeLeaves = () => {
    if (money >= 35) {
      setMoney((prevMoney) => prevMoney - 35);
      setTreevis("treebutton");
      setTreeCount((prevTreeCount) => prevTreeCount + 10);
    }
  };

  const openShop = () => {
    if (!shopIsOpen) {
      shopIsOpen = true;
      setShop("vis");
    } else {
      shopIsOpen = false;
      setShop("invis");
    }
  };

  const Shearing = () => {
    if (!shearsEquipped) {
      setShearsEquipped(true);
    } else {
      setShearsEquipped(false);
    }
  };

  const shiftDialogue = () => {
    setDialogueCount((prevDialogueCount) => prevDialogueCount + 1);
    if (dialogueCount == 1) {
      setDialogueText("youre the new farmer, right?");
    } else if (dialogueCount == 2) {
      setDialogueText("good. ill teach you the basics");
    } else if (dialogueCount == 3) {
      setDialogueText(
        "see that button labeled carrot stack?\n click that, then click on the sheep.",
      );
    } else if (dialogueCount == 4) {
      setDialogueText("done? perfect");
    } else if (dialogueCount == 5) {
      setDialogueText("check the shop. heres some cash.");
      setMoney((prevMoney) => prevMoney + 150);
    } else if (dialogueCount == 6) {
      setDialogueText(
        "you can also buy more sheep!\n (the dev hasn't added this yet)",
      );
    } else if (dialogueCount == 7) {
      setDialogueText("thats all for now.\n good luck!");
    } else if (dialogueCount == 8) {
      setDialogueText("");
      setMosesHere("invisible");
    }
  };

  const addLineBreaks = (str: string) =>
    str.split("\n").map((subStr, index) => (
      <Fragment key={index}>
        {subStr}

        {index < str.split("\n").length - 1 && <br />}
      </Fragment>
    ));

  const handleSaveClick = async () => {
    setSaveGameUse("Saved!");
    await delay(500);
    setSaveGameUse("Save Game");
  };

  return (
    <>
      <p className="power">Funds: ${money}</p>

      <div>
        <button className="buttton" onClick={carrotClick}>
          Carrot stack is {carrotCount}
        </button>
        <br />
        <button className={treevis} onClick={treeClick}>
          Tree Bags left: {treeCount}
        </button>
      </div>

      <img className={`left ${mosesHere}`} src={moses} />

      <p className="red">Hunger: {hunger}</p>

      <br />

      <img onClick={consumeFood} className="ezrasheep" src={sheepImage} />

      <div>
        <button className="right" onClick={openShop}>
          Shop
        </button>
        <br />
        <br />
        <br />
        <button className={`shopping ${shop}`} onClick={buyCarrots}>
          Buy 15 Carrots! (20)
        </button>
        <br />
        <br />
        <br />
        <br />
        <button className={`shopping ${shop}`} onClick={buyTreeLeaves}>
          Buy 10 Tree Leaf Bundles! (30)
        </button>
      </div>
      <button className="shears shearsagain" onClick={Shearing}>
        Shears
      </button>

      <div className={`dialouge ${mosesHere}`} onClick={shiftDialogue}>
        <h4 className={`dialouge ${mosesHere}`}>Moses</h4>
        <p className={`dialouge ${mosesHere}`}>{addLineBreaks(dialougeText)}</p>
      </div>
      <button
        className="orange"
        onClick={() => {
          saveGame();
          handleSaveClick();
        }}
      >
        {SaveGameUse}
      </button>
      <br />
      <button
        className="orange"
        onClick={() => {
          localStorage.removeItem("ezrasheepsave");
          window.location.reload();
        }}
      >
        New Game
      </button>
    </>
  );
}
