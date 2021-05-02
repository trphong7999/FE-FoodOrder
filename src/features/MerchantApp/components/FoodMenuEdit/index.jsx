import React from "react";
import { useLocation } from "react-router";
import "./style.scss";

export default function FoodMenuEdit() {
  const location = useLocation();
  console.log(location);
  return (
    <div>
      <h2>food edit</h2>
    </div>
  );
}
