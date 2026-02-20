import { useState, useEffect, Fragment } from "react";
import sheep from "./Images/sheep.png";
import moses from "./Images/moses.png";
import "./App.css";

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

  useEffect(() => {
    const interval = setInterval(() => {
      setHunger((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval); // cleanup
  }, []);

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
    if (carrotOpen) {
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
    }
  };

  const addLineBreaks = (str) =>
    str.split("\n").map((subStr, index) => (
      <Fragment key={index}>
        {subStr}

        {index < str.split("\n").length - 1 && <br />}
      </Fragment>
    ));

  return (
    <>
      <p className="top">Funds: {money}</p>
      <br />
      <br />
      <div>
        <button className="buttton" onClick={carrotClick}>
          Carrot stack is {carrotCount}
        </button>
        <br />
        <button className={treevis} onClick={treeClick}>
          Tree Bags left: {treeCount}
        </button>
      </div>

      <img className="left" src={moses} />

      <p>Hunger: {hunger}</p>

      <br />

      <img onClick={consumeFood} src={sheep} alt="sheep" />

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

      <div>
        <p>Moses</p>

        <p className="dialouge" onClick={shiftDialogue}>
          {addLineBreaks(dialougeText)}
        </p>
      </div>
    </>
  );
}
