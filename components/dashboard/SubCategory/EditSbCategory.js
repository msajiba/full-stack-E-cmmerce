import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import React from "react";

const EditSbCategory = ({
  productDialog,
  productDialogFooter,
  hideDialog,
  product,
  submitted,
  setSelectedCity,
  selectedCity,
  products,
}) => {

    
  const cities = [
    { name: "New York", code: "NY" },
    { name: "Rome", code: "RM" },
    { name: "London", code: "LDN" },
    { name: "Istanbul", code: "IST" },
    { name: "Paris", code: "PRS" },
  ];

  return (
    <>
      <Dialog
        visible={productDialog}
        style={{ width: "500px" }}
        header="Product Details"
        modal
        className="p-fluid"
        footer={productDialogFooter}
        onHide={hideDialog}
      >
        <div className="field">
          <label htmlFor="name">Name</label>
          <InputText
            id="name"
            value={product.name}
            onChange={(e) => onInputChange(e, "name")}
            required
            autoFocus
            className={classNames({
              "p-invalid": submitted && !product.name,
            })}
          />
          {submitted && !product.name && (
            <small className="p-invalid">Name is required.</small>
          )}
        </div>

        <div className="field">
          <label className="mb-3">Category</label>
          <div className="formgrid grid">
            <div className="fixed">
              <Dropdown
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                options={products}
                optionLabel="name"
                placeholder="Select a City"
                className="w-full md:w-14rem fixed"
              />
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default EditSbCategory;
