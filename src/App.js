import { useEffect, useState } from "react";
import Header from "./Components/Header/Header";
import Keypad from "./Components/Keypad/Keypad";
import sunIcon from "./images/sun.png";
import moonIcon from "./images/moon-icon-23634.png";
import "./App.css";

const usedKeyCodes = [
  48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 96, 97, 98, 99, 100, 101, 102, 103,
  104, 105, 8, 13, 190, 187, 189, 191, 56, 111, 106, 107, 109,
];
const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const operators = ["-", "+", "*", "/"];

function App() {
  const [darkMode, setDarkMode] = useState(
    JSON.parse(window.localStorage.getItem("darkMode")) || false
  );
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState("");
  const [history, setHistory] = useState(
    JSON.parse(window.localStorage.getItem("history")) || []
  );

  useEffect(() => {
    window.localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);
  useEffect(() => {
    window.localStorage.setItem("history", JSON.stringify(history));
  }, [history]);

  const handleKeyPress = (keyCode, key) => {
    if (!keyCode) return;
    if (!usedKeyCodes.includes(keyCode)) return;

    if (numbers.includes(key)) {
      if (key === 0) {
        if (expression.length === 0) return;
      }
      calculateResult(expression + key);
      setExpression(expression + key);
    }
    if (operators.includes(key)) {
      if (expression.length === 0) return;
      const lastChar = expression.slice(-1);
      if (operators.includes(lastChar) || lastChar === ".") return;
      setExpression(expression + key);
    }
    if (keyCode === 13) {
      if (expression.length === 0) return;
      calculateResult(expression);

      const tempHistory = [...history];
      if (history.length > 20) tempHistory.splice(0, 1);

      tempHistory.push(expression);
      setHistory(tempHistory);
    }
    if (key === ".") {
      if (expression.length === 0) return;
      const lastChar = expression.slice(-1);
      if (!numbers.includes(lastChar)) return;
      setExpression(expression + key);
    }
    if (keyCode === 8) {
      if (expression.length === 0) return;

      calculateResult(expression.slice(0, -1));
      setExpression(expression.slice(0, -1));
    }
  };

  const calculateResult = (exp) => {
    if (!exp) {
      setResult(0);
      return;
    }
    const lastChar = exp.slice(-1);
    if (!numbers.includes(lastChar)) exp = exp.slice(0, -1);
    const ans = eval(exp).toFixed(2) + "";
    setResult(ans);
  };

  return (
    <div
      className="app"
      tabIndex="0"
      onKeyDown={(e) => handleKeyPress(e.keyCode, e.key)}
      data-theme={darkMode && "dark"}
    >
      <div className="app_calculator">
        <div className="app_calculator_navbar">
          <div
            onClick={() => setDarkMode(!darkMode)}
            className="app_calculator_navbar_toggle"
          >
            <div
              className={`app_calculator_navbar_toggle_circle ${
                darkMode ? `app_calculator_navbar_toggle_circle_active` : ""
              }`}
            />
          </div>
          <img
            src={darkMode ? moonIcon : sunIcon}
            width="24px"
            height="24px"
            alt="Dark Mode"
          />
        </div>
        <Header history={history} result={result} expression={expression} />
        <Keypad handleKeyPress={handleKeyPress} />
      </div>
    </div>
  );
}

export default App;
