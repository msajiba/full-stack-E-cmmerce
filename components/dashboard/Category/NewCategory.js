import axios from "axios";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { classNames } from "primereact/utils";
import React, { useRef, useState } from "react";

const NewCategory = ({refetch}) => {
  const [sbCtgDialog, setSbCtgDialog] = useState(false);
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const toast = useRef(null);

  const openNew = () => {
    setSbCtgDialog(true);
  };

  const saveSubCtg = async () => {
    setSubmitted(true);
    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/admin/category",
        {
          name,
          image,
        }
      );

      console.log(data);

      if (data.status === true) {
        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: `${data.message}`,
          life: 3000,
        });
        setSbCtgDialog(false);
        setName("");
        setImage("");
      } else {
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: `${data.message}`,
          life: 3000,
        });
      }
    } catch (error) {
      console.log(error);
    }
    refetch()
  };

  const subCtgDialogFooter = (
    <>
      <Button
        label="Cancel"
        icon="pi pi-times"
        text
        onClick={() => setSbCtgDialog(false)}
      />
      <Button label="Save" icon="pi pi-check" text onClick={saveSubCtg} />
    </>
  );

  return (
    <>
      <Toast ref={toast} />

      <Button
        label="Add New"
        icon="pi pi-plus"
        severity="sucess"
        className="mr-2"
        onClick={openNew}
      />

      <Dialog
        visible={sbCtgDialog}
        style={{ width: "500px" }}
        header="Add New Category"
        modal
        className="p-fluid"
        footer={subCtgDialogFooter}
        onHide={() => setSbCtgDialog(false)}
      >
        <div className="field">
          <label htmlFor="name">Image</label>
          <InputText
            id="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
            autoFocus
            className={classNames({
              "p-invalid": submitted && !image,
            })}
          />
          {submitted && !image && (
            <small
              style={{ fontSize: "1rem", color: "red" }}
              className="p-invalid"
            >
              Image is required.
            </small>
          )}
        </div>

        <div className="field">
          <label htmlFor="name">Name</label>
          <InputText
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required

            className={classNames({
              "p-invalid": submitted && !name,
            })}
          />
          {submitted && !name && (
            <small
              style={{ fontSize: "1rem", color: "red" }}
              className="p-invalid"
            >
              Name is required.
            </small>
          )}
        </div>
      </Dialog>
    </>
  );
};

export default NewCategory;
