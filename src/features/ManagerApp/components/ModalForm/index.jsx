import { useState } from "react";
import MultiStep from "./react-multistep";
import Form1 from "./Form1";
import Form2 from "./Form2";
import Form3 from "./Form3";
import "./style.scss";

const { makeStyles } = require("@material-ui/core");
const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: "70rem",
    height: "70rem",
    top: "calc((100vh - 70rem)/2)",
    left: "calc((100vw - 70rem)/2)",
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(3, 5, 3),
  },
}));

const nextStyle = {
  background: "#781de1",
  borderWidth: "2px",
  padding: "1rem 2rem",
  borderRadius: "8px",
  color: "#f1f1f1",
  position: "absolute",
  bottom: "3rem",
  right: "5.5rem",
};

const prevStyle = {
  ...nextStyle,
  left: "5.5rem",
};

function ModalForm({ handleClose }) {
  const [name, setName] = useState("");
  const [location, setLocation] = useState({
    address: "",
    district: 1,
    lat: "20.828790101307185",
    lng: "106.71664668177716",
  });
  const [representative, setRepresentative] = useState("");
  const [emailConfirm, setEmailConfirm] = useState("");
  const classes = useStyles();

  const steps = [
    {
      name: "Thông tin quán - Cơ bản",
      component: (
        <Form1
          name={name}
          setName={setName}
          location={location}
          setLocation={setLocation}
        />
      ),
    },
    {
      name: "Thông tin người đại diện",
      component: (
        <Form2
          representative={representative}
          setRepresentative={setRepresentative}
        />
      ),
    },
    {
      name: "Thông tin quán - Chi tiết",
      component: <Form3 />,
    },
  ];
  return (
    <div className={classes.paper}>
      <button
        style={{
          position: "absolute",
          right: 20,
          top: 15,
          fontSize: "1.5rem",
        }}
        onClick={() => handleClose()}
      >
        Hủy
      </button>
      <div className="modal-container">
        <MultiStep steps={steps} prevStyle={prevStyle} nextStyle={nextStyle} />
      </div>
    </div>
  );
}

export default ModalForm;
