import axios from "axios";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Toast } from "primereact/toast";
import { classNames } from "primereact/utils";
import React, { useEffect, useRef, useState } from "react";
import { InputSwitch } from "primereact/inputswitch";
import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown } from "primereact/dropdown";

const NewProduct = ({ refetch, categories }) => {
  const [productDialog, setProductDialog] = useState(false);
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [original_price, setOriginal_Price] = useState(0);
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [description, setDescription] = useState("");
  const [bestdeal, setBestDeal] = useState(false);
  const [discountedsale, setDiscountedSale] = useState(false);
  const [selectedSub, setSelectedSub] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const toast = useRef(null);

  useEffect(() => {
    setSelectedSub(category.subCategories);
  }, [category]);

  const createProduct = {
    image,
    name,
    price,
    original_price,
    category: category._id,
    subCategory: subCategory._id,
    quantity,
    description,
    bestdeal,
    discountedsale,
  };

  const saveProduct = async () => {
    setSubmitted(true);
    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/admin/product",
        createProduct
      );

      if (data.status === true) {
        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: `${data.message}`,
          life: 3000,
        });
        setProductDialog(false);
        setName("");
        setImage("");
        setPrice(0);
        setOriginal_Price(0);
        setQuantity(0);
        setCategory("");
        setSubCategory("");
        setDescription("");
        setBestDeal(false);
        setDiscountedSale(false);
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
    refetch();
  };

  const subCtgDialogFooter = (
    <>
      <Button
        label="Cancel"
        icon="pi pi-times"
        text
        onClick={() => setProductDialog(false)}
      />
      <Button label="Save" icon="pi pi-check" text onClick={saveProduct} />
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
        onClick={() => setProductDialog(true)}
      />

      <Dialog
        visible={productDialog}
        style={{ width: "500px" }}
        header="Add New Product"
        modal
        className="p-fluid"
        footer={subCtgDialogFooter}
        onHide={() => setProductDialog(false)}
      >
        <div className="formgrid grid">
          <div className="field col">
            <label htmlFor="image">Image</label>
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
          <div className="field col">
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
        </div>

        {/* CATEGORY AND SUB_CATEGORY */}
        <div className="formgrid grid">
          <div className="field col">
            <label htmlFor="ctg">Category</label>

            <Dropdown
              value={category}
              onChange={(e) => setCategory(e.value)}
              options={categories}
              optionLabel="name"
              placeholder="Select a Category"
              className={classNames({
                "p-invalid": submitted && !category,
              })}
            />

            {submitted && !category && (
              <small
                style={{ fontSize: "1rem", color: "red" }}
                className="p-invalid"
              >
                Category is required.
              </small>
            )}
          </div>

          <div className="field col">
            <label htmlFor="sub-ctg">Sub Category</label>

            <Dropdown
              value={subCategory}
              onChange={(e) => setSubCategory(e.value)}
              options={selectedSub}
              optionLabel="name"
              placeholder="Select a Category"
              className={classNames({
                "p-invalid": submitted && !subCategory,
              })}
            />

            {submitted && !subCategory && (
              <small
                style={{ fontSize: "1rem", color: "red" }}
                className="p-invalid"
              >
                Sub Category is required.
              </small>
            )}
          </div>
        </div>

        {/* PRICE _ ORIGINAL_PRICE & QUANTITY  */}
        <div className="formgrid grid">
          <div className="field col">
            <label htmlFor="original_price">Original Price</label>
            <InputNumber
              id="original_price"
              value={original_price}
              onChange={(e) => setOriginal_Price(e.value)}
              required
              className={classNames({
                "p-invalid": submitted && !original_price,
              })}
            />
            {submitted && !original_price && (
              <small
                style={{ fontSize: "1rem", color: "red" }}
                className="p-invalid"
              >
                Original Price is required.
              </small>
            )}
          </div>

          <div className="field col">
            <label htmlFor="price">Price</label>
            <InputNumber
              id="price"
              value={price}
              onChange={(e) => setPrice(e.value)}
              required
              className={classNames({
                "p-invalid": submitted && !price,
              })}
            />
            {submitted && !price && (
              <small
                style={{ fontSize: "1rem", color: "red" }}
                className="p-invalid"
              >
                Price is required.
              </small>
            )}
          </div>

          <div className="field col">
            <label htmlFor="quantify">Quantity</label>
            <InputNumber
              id="quantify"
              value={quantity}
              onChange={(e) => setQuantity(e.value)}
              required
              className={classNames({
                "p-invalid": submitted && !quantity,
              })}
            />
            {submitted && !quantity && (
              <small
                style={{ fontSize: "1rem", color: "red" }}
                className="p-invalid"
              >
                Quantity is required.
              </small>
            )}
          </div>
        </div>

        <div className="field col">
          <label htmlFor="des">Description</label>
          <InputTextarea
            id="des"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className={classNames({
              "p-invalid": submitted && !description,
            })}
          />
          {submitted && !description && (
            <small
              style={{ fontSize: "1rem", color: "red" }}
              className="p-invalid"
            >
              Description is required.
            </small>
          )}
        </div>

        {/* DISCOUND AND BEST SALE */}
        <div className="formgrid grid">
          <div className="field col flex justify-content-between align-content-center">
            <label htmlFor="bestdeal">Best Deal</label>
            <InputSwitch
              id="bestdeal"
              checked={bestdeal}
              onChange={(e) => setBestDeal(!bestdeal)}
              required
              className="small"
            />
          </div>

          <div className="field col flex justify-content-between align-content-center">
            <label htmlFor="discountedSale">Discounted Sale</label>
            <InputSwitch
              id="discountedSale"
              checked={discountedsale}
              onChange={(e) => setDiscountedSale(!discountedsale)}
              required
              className="small"
            />
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default NewProduct;
