"use client"

import React, { ChangeEvent, useState, MouseEvent } from "react";

export default function TestButton() {
    const [clickedButton, setClickedButton] = useState("");

// Apparently you have to make a client component to be able to add event listeners / pass functions into an element
// Since this is now a component, we should pass in the relevant text / colors / function to be activated on Click? 
// Alternately, we can just make special individual buttons as needed here and drop them into the necessary page?

const clickTest = (event : React.MouseEvent<HTMLButtonElement>) => {
    console.log("clicked button test");
    setClickedButton("clickMeButton")
}
  return <button className={clickedButton === "clickMeButton" ? "button bg-lilac drop-shadow-smJade" : "button bg-orange drop-shadow-smSky"} onClick={clickTest}>click me</button>;
}