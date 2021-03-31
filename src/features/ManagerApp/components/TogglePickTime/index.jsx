import React from "react";
import { FormControlLabel, Switch } from "@material-ui/core";

function TogglePickTime({ item, infoDetail, setInfoDetail }) {
  const toggleChecked = () => {
    const infos = infoDetail;
    infos.openTime[item].enable = !infos.openTime[item].enable;

    setInfoDetail({ ...infos });
  };
  const changeStartTime = (e) => {
    const infos = infoDetail;
    infos.openTime[item].time =
      e.target.value + "-" + infos.openTime[item].time.split("-")[1];

    setInfoDetail({ ...infos });
  };

  const changeEndTime = (e) => {
    const infos = infoDetail;
    infos.openTime[item].time =
      infos.openTime[item].time.split("-")[0] + "-" + e.target.value;

    setInfoDetail({ ...infos });
  };
  return (
    <div style={{ display: "flex", width: "100%" }}>
      <FormControlLabel
        control={
          <Switch
            size="small"
            checked={infoDetail.openTime[item].enable}
            onChange={toggleChecked}
          />
        }
        style={{ marginLeft: "auto", textAlign: "right" }}
      />
      <label style={{ flexBasis: "30%" }}>
        {infoDetail.openTime[item].label}
      </label>
      {infoDetail.openTime[item].enable && (
        <input
          type="time"
          name="time-start"
          value={infoDetail.openTime[item].time.split("-")[0]}
          onChange={changeStartTime}
          required
          style={{ flexBasis: "51%" }}
        />
      )}
      {infoDetail.openTime[item].enable && (
        <label style={{ textAlign: "center", flexBasis: "10%" }}>-</label>
      )}
      {infoDetail.openTime[item].enable && (
        <input
          type="time"
          name="time-end"
          value={infoDetail.openTime[item].time.split("-")[1]}
          onChange={changeEndTime}
          required
          style={{ flexBasis: "51%" }}
        />
      )}
    </div>
  );
}

export default TogglePickTime;
