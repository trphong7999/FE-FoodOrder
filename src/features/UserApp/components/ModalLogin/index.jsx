import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import FormLoginValidation from "features/UserApp/components/ModalLogin/FormLoginValidation/FormLogin";
import FormRegisterValidation from "features/UserApp/components/ModalLogin/FormLoginValidation/FormRegister";
import "./style.scss";

const useStyles = makeStyles((theme) => ({
  modalWrap: {
    lineHeight: "var(--navbar-height)",
  },
  button: {
    fontSize: "1.6rem",
    color: "var(--white-color)",
    backgroundColor: "var(--primary-color)",
    "&:hover": { backgroundColor: "#f7001eab" },
    "&:focus": { outline: "none" },
    padding: "10px 20px",
    fontWeight: "bold",
    cursor: "pointer",
    border: "none",
    borderRadius: "8px",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    outline: "none",
  },
}));

export default function ModalLogin() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [switchForm, setWitchForm] = useState(true);

  const handleClickSwitchForm = (childData) => {
    setWitchForm(childData);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.modalWrap}>
      <button className={classes.button} type="button" onClick={handleOpen}>
        Đăng nhập
      </button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            {switchForm === true ? (
              <FormLoginValidation clickSwitchForm={handleClickSwitchForm} />
            ) : (
              <FormRegisterValidation clickSwitchForm={handleClickSwitchForm} />
            )}
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
