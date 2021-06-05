import React from "react";
import { Switch } from "@material-ui/core";
import "./style.scss";

function TogglePickTime({ item, openTime, setOpenTime }) {
  const toggleChecked = () => {
    const infos = openTime;
    infos[item].enable = !infos[item].enable;

    setOpenTime({ ...infos });
  };
  const changeStartTime = (e) => {
    const infos = openTime;
    infos[item].time = e.target.value + "-" + infos[item].time.split("-")[1];

    setOpenTime({ ...infos });
  };

  const changeEndTime = (e) => {
    const infos = openTime;
    infos[item].time = infos[item].time.split("-")[0] + "-" + e.target.value;

    setOpenTime({ ...infos });
  };

  return (
    <div className="time__list-item">
      <Switch
        checked={openTime[item].enable}
        onChange={toggleChecked}
        color="primary"
        name="checkedB"
        inputProps={{ "aria-label": "primary checkbox" }}
      />
      <label className="label-title">
        {item === "sun" ? "CN" : openTime[item].label}
      </label>
      {openTime[item].enable && (
        <input
          type="time"
          name="time-start"
          value={openTime[item].time.split("-")[0]}
          onChange={changeStartTime}
          required
          style={{ flexBasis: "51%" }}
        />
      )}
      {openTime[item].enable && <label className="label-space">-</label>}
      {openTime[item].enable && (
        <input
          type="time"
          name="time-end"
          value={openTime[item].time.split("-")[1]}
          onChange={changeEndTime}
          required
          style={{ flexBasis: "51%" }}
        />
      )}
    </div>
  );
}

export default TogglePickTime;
