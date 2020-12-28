import React, { useState, useEffect, useRef } from "react";
import style from "./CityAsideBar.module.scss";

const letters = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
].map((item) => {
  return item.toUpperCase();
});

const CityAsideBar = (props) => {
  const { getCurrentIndex, currIdx, areaHeight } = props;

  const sideBarConRef = useRef();

  const [activeIndex, setActiveIndex] = useState("A");
  const [touchStartY, setTouchStartY] = useState(null);

  const [alphaLisYData, setAlphaLisYData] = useState([]);

  const switchIndex = (touchY) => {
    let index;
    if (touchY <= alphaLisYData[0]) {
      index = 0;
    } else if (touchY >= alphaLisYData[alphaLisYData.length - 1]) {
      index = alphaLisYData.length - 1;
    } else {
      index = alphaLisYData.findIndex(
        (item, idx) => touchY >= item && touchY < alphaLisYData[idx + 1]
      );
    }
    getCurrentIndex(index);
  };

  const handleTouchEnd = (e) => {
    const endTouchY = e.changedTouches[0].clientY;
    switchIndex(endTouchY);
    window.removeEventListener("touchmove", handleTouchMove, {
      passiveL: false,
    });
    window.removeEventListener("touchend", handleTouchEnd, { passiveL: false });
  };

  const handleTouchMove = (e) => {
    const moveTouchY = e.touches[0].clientY;
    switchIndex(moveTouchY);
  };

  useEffect(() => {
    if (areaHeight) {
      const tempArr = [];
      const alphaHeight = sideBarConRef.current.offsetHeight;
      const liHeight = sideBarConRef.current.children[0].offsetHeight;
      const headerHeight = document.querySelector(".cityHeader").offsetHeight;

      Array.from(sideBarConRef.current.children).forEach((_item, idx) => {
        tempArr.push(
          headerHeight + (areaHeight - alphaHeight) / 2 + liHeight * idx
        );
      });
      setAlphaLisYData(tempArr);
    }
  }, [areaHeight]);

  useEffect(() => {
    letters.forEach((item, idx) => {
      if (idx === currIdx) {
        setActiveIndex(item);
        return false;
      }
    });
  });

  useEffect(() => {
    if (touchStartY !== null) {
      window.addEventListener("touchmove", handleTouchMove);
      window.addEventListener("touchend", handleTouchEnd);
    }
    // eslint-disable-next-line
  }, [touchStartY]);

  const handleTouchStart = (e) => {
    const index = letters.findIndex((item) => item === e.target.innerText);
    getCurrentIndex(index);
    setTouchStartY(e.touches[0].clientY);
  };

  return (
    <ul className={style.sideBarCon} ref={sideBarConRef}>
      {letters.map((item) => {
        return (
          <li
            key={item}
            onTouchStart={handleTouchStart}
            className={activeIndex === item ? style.active : ""}
          >
            {item}
          </li>
        );
      })}
    </ul>
  );
};

export default CityAsideBar;
