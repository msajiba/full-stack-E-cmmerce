/* eslint-disable */
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { InputText } from "primereact/inputtext";
import { Rating } from "primereact/rating";
import { Toast } from "primereact/toast";
import { Toolbar } from "primereact/toolbar";
import React, { useEffect, useRef, useState } from "react";
import { ProductService } from "../../../demo/service/ProductService";
import DashboardContainer from "../../../layout/DashboardContainer";
import db from "../../../config/db";
import NewProduct from "../../../components/dashboard/Products/NewProduct";
import EditProduct from "../../../components/dashboard/Products/EditProduct";
import DeleteProduct from "../../../components/dashboard/Products/DeleteProduct";
import { Badge } from "primereact/badge";
import Category from "../../../server/models/Category";
import Product from "../../../server/models/Product";

const index = ({ categories }) => {
  const [products, setProducts] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState(null);
  const [globalFilter, setGlobalFilter] = useState(null);
  const toast = useRef(null);
  const dt = useRef(null);

  useEffect(() => {
    ProductService.getProducts().then((data) => setProducts(data));
  }, []);

  const formatCurrency = (value) => {
    return value.toLocaleString("en-US", {
      style: "currency",
      currency: "BDT",
    });
  };

  const nameBodyTemplate = (rowData) => {
    return (
      <>
        <span className="p-column-title">Name</span>
        {rowData.name}
      </>
    );
  };

  const imageBodyTemplate = (rowData) => {
    return (
      <>
        <span className="p-column-title">Image</span>
        <img
          src={`/demo/images/product/${rowData.image}`}
          alt={rowData.image}
          className="shadow-2"
          width="100"
        />
      </>
    );
  };

  const priceBodyTemplate = (rowData) => {
    return (
      <>
        <span className="p-column-title">Price</span>
        {formatCurrency(rowData.price)}
      </>
    );
  };

  const categoryBodyTemplate = (rowData) => {
    return (
      <>
        <span className="p-column-title">Category</span>
        {rowData.category}
      </>
    );
  };

  const ratingBodyTemplate = (rowData) => {
    return (
      <>
        <span className="p-column-title">Reviews</span>
        <Rating value={rowData.rating} readOnly cancel={false} />
      </>
    );
  };

  const statusBodyTemplate = (rowData) => {
    return (
      <>
        <span className="p-column-title">Status</span>
        <span
          className={`product-badge status-${rowData.inventoryStatus.toLowerCase()}`}
        >
          {rowData.inventoryStatus}
        </span>
      </>
    );
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <>
        <EditProduct rowData={rowData} />
        <DeleteProduct rowData={rowData} />
      </>
    );
  };

  const header = (
    <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
      <h5 className="m-0">
        Products
        <Badge
          className="ml-2"
          value={products?.length}
          size="large"
          severity="success"
        />
      </h5>
      <span className="block mt-2 md:mt-0 p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          type="search"
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search..."
        />
      </span>
    </div>
  );

  return (
    <DashboardContainer>
      <div className="grid crud-demo">
        <div className="col-12">
          <div className="card">
            <Toast ref={toast} />
            <Toolbar
              className="mb-4"
              right={<NewProduct categories={categories} />}
            />
            <DataTable
              ref={dt}
              value={products}
              selection={selectedProducts}
              onSelectionChange={(e) => setSelectedProducts(e.value)}
              dataKey="id"
              paginator
              rows={10}
              rowsPerPageOptions={[5, 10, 25]}
              className="datatable-responsive"
              paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
              currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
              globalFilter={globalFilter}
              emptyMessage="No products found."
              header={header}
              responsiveLayout="scroll"
            >
              <Column header="Image" body={imageBodyTemplate} />

              <Column
                field="name"
                header="Name"
                sortable
                body={nameBodyTemplate}
                headerStyle={{ minWidth: "10rem" }}
              />

              <Column
                field="price"
                header="Price"
                body={priceBodyTemplate}
                sortable
              />

              <Column
                field="category"
                header="Category"
                sortable
                body={categoryBodyTemplate}
                headerStyle={{ minWidth: "10rem" }}
              />

              <Column
                field="rating"
                header="Quantity"
                body={ratingBodyTemplate}
                sortable
              />

              <Column
                field="inventoryStatus"
                header="Status"
                body={statusBodyTemplate}
                sortable
                headerStyle={{ minWidth: "10rem" }}
              />
              <Column
                header="Action"
                body={actionBodyTemplate}
                headerStyle={{ minWidth: "10rem" }}
              />
            </DataTable>
          </div>
        </div>
      </div>
    </DashboardContainer>
  );
};

export default index;

export async function getServerSideProps() {
  db.connectDb();
  let products = await Product.find().sort({ createdAt: -1 }).lean();
  const categories = await Category.find({}).populate("subCategories").sort({ createdAt: -1 }).lean();

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
      categories: JSON.parse(JSON.stringify(categories)),
    },
  };
}
