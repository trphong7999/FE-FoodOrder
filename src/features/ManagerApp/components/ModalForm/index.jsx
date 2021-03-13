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
    height: "50rem",
    top: "calc((100vh - 50rem)/2)",
    left: "calc((100vw - 70rem)/2)",
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(7, 7, 3),
  },
}));

const prevStyle = { background: "#33c3f0", borderWidth: "2px" };
const nextStyle = { background: "#33c3f0", borderWidth: "2px" };

function ModalForm({ handleClose }) {
  const [email, setEmail] = useState("");
  const [emailConfirm, setEmailConfirm] = useState("");
  const classes = useStyles();

  const steps = [
    {
      name: "Bước 1",
      component: <Form1 />,
    },
    {
      name: "Bước 2",
      component: <Form1 />,
    },
    {
      name: "Bước 3",
      component: <Form1 />,
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
