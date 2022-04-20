import React, { useEffect, useRef } from "react";
import "./Header.css";

const Header = ({ result, expression, history }) => {
  const resultRef = useRef();
  const expressionRef = useRef();

  useEffect(() => {
    resultRef.current.scrollIntoView();
  }, [history]);
  useEffect(() => {
    expressionRef.current.scrollLeft = expressionRef.current.scrollWidth;
  }, [expression]);

  return (
    <div className="header custom-scroll">
      <div className="header_history">
        {history?.map((ex) => (
          <p>{ex}</p>
        ))}
      </div>
      <br />
      <div ref={expressionRef} className="header_expression custom-scroll">
        <p>{expression}</p>
      </div>
      <p ref={resultRef} className="header_result">
        {result ? result : 0}
      </p>
    </div>
  );
};

export default Header;
