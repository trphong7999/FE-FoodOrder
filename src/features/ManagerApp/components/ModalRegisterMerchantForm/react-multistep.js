import React, { useState } from "react";
import { css, styled, setup } from "goober";
setup(React.createElement);

const Ol = styled("ol")`
  margin: 0;
  padding-left: 0;
  padding-bottom: 2.2rem;
  list-style-type: none;
`;

const LiClass = (props) => css`
  width: 10rem;
  display: inline-block;
  text-align: center;
  line-height: 1.5rem;
  padding: 0 0.7rem;
  cursor: pointer;

  color: ${props.state === "todo" ? "silver" : "black"};
  border-bottom: 4px solid ${props.state === "todo" ? "silver" : "#781de1"};

  &:before {
    position: relative;
    bottom: -3.8rem;
    float: left;
    left: 50%;

    ${props.state === "todo"
      ? 'content: "\u039F";'
      : props.state === "doing"
      ? 'content: "\u2022";'
      : 'content: "\u2713";'}
    color: ${props.state === "todo" ? "silver" : "white"}!important;
    background-color: ${props.state === "todo" ? "white" : "#781de1"};
    width: 1.2em;
    line-height: ${props.state === "todo" ? "1.2em" : "1.2em"};
    border-radius: ${props.state === "todo" ? "0" : "1.2em"};
  }
  &:hover,
  &::before {
    color: #781de1;
    bottom: -7rem;
  }
  &:after {
    content: "\\00a0\\00a0";
  }
  span {
    display: inline-block;
    width: 10rem;
    line-height: 1.5rem;
    padding: 0 1.5rem;
  }
`;
const getTopNavStyles = (indx, length) => {
  let styles = [];
  for (let i = 0; i < length; i++) {
    if (i < indx) {
      styles.push("done");
    } else if (i === indx) {
      styles.push("doing");
    } else {
      styles.push("todo");
    }
  }
  return styles;
};

const getButtonsState = (indx, length) => {
  if (indx > 0 && indx < length - 1) {
    return {
      showPreviousBtn: true,
      showNextBtn: true,
    };
  } else if (indx === 0) {
    return {
      showPreviousBtn: false,
      showNextBtn: true,
    };
  } else {
    return {
      showPreviousBtn: true,
      showNextBtn: false,
    };
  }
};

export default function MultiStep(props) {
  let showNav = true;
  if (props.showNavigation) showNav = props.showNavigation;

  let prevStyle = {};
  if (props.prevStyle) prevStyle = props.prevStyle;

  let nextStyle = {};
  if (props.nextStyle) nextStyle = props.nextStyle;

  const [stylesState, setStyles] = useState(
    getTopNavStyles(0, props.steps.length)
  );
  const [compState, setComp] = useState(0);
  const [buttonsState, setButtons] = useState(
    getButtonsState(0, props.steps.length)
  );

  const setStepState = (indx) => {
    setStyles(getTopNavStyles(indx, props.steps.length));
    setComp(indx < props.steps.length ? indx : compState);
    setButtons(getButtonsState(indx, props.steps.length));
  };

  const next = () => setStepState(compState + 1);
  const previous = () =>
    setStepState(compState > 0 ? compState - 1 : compState);
  const handleKeyDown = (evt) =>
    evt.which === 13 ? next(props.steps.length) : {};

  const handleOnClick = (evt) => {
    if (
      evt.currentTarget.value === props.steps.length - 1 &&
      compState === props.steps.length - 1
    ) {
      setStepState(props.steps.length);
    } else {
      setStepState(evt.currentTarget.value);
    }
  };

  const renderSteps = () =>
    props.steps.map((s, i) => (
      <li
        className={LiClass({ state: stylesState[i] })}
        onClick={handleOnClick}
        key={i}
        value={i}
      >
        <span>{s.name}</span>
      </li>
    ));

  const renderNav = (show) =>
    show && (
      <div>
        <button
          style={
            buttonsState.showPreviousBtn ? props.prevStyle : { display: "none" }
          }
          onClick={previous}
        >
          Prev
        </button>

        <button
          style={
            buttonsState.showNextBtn ? props.nextStyle : { display: "none" }
          }
          onClick={next}
        >
          Next
        </button>
      </div>
    );

  return (
    <div onKeyDown={handleKeyDown}>
      <Ol>{renderSteps()}</Ol>
      <div>{props.steps[compState].component}</div>
      <div>{renderNav(showNav)}</div>
    </div>
  );
}
