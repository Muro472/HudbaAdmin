import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import Pagination from "@mui/material/Pagination";
import Button from "@mui/material/Button";

import ItemsTable from "../../components/tables/ItemsTable.tsx";
import TableSkeletonLoaderLayout from "../../components/general/TableSkeletonLoaderLayout.tsx";
import AreYouShureDialog from "../../components/dialogs/AreYouShureDialog.tsx";
import CreateOrEditItemDialog from "../../components/dialogs/CreateOrEditItemDialog.tsx";

import { api } from "../../utils/api.ts";
import { IProductFromList } from "../../types/responses";
import { categoryLabelChanger } from "../../utils/categoryLabelChanger.ts";
import { categories } from "../../utils/categories.ts";

import "../../scss/pages/_items-page.scss";
import { Dialog } from "@mui/material";

const drawerActive = (isActive: boolean) =>
  (isActive ? "items-page__main-nav-item-active " : "") +
  "items-page__main-nav-item";

export default function ItemsPage() {
  const loadingLength = 20;

  const [paginationPage, setPaginationPage] = useState<number>(1);
  const [dialogItem, setDialogItem] = useState<IProductFromList | null>(null);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [rows, setRows] = useState<IProductFromList[]>([]);
  const [dialogType, setDialogType] = useState<
    "delete" | "edit" | "create" | ""
  >("");

  const [searchParams, setSearchParams] = useSearchParams();

  const handleChangeParams = (value: string) => {
    setSearchParams({ category: value });
    setRows([]);
    setTotalPages(1);
    setPaginationPage(1);
    getData(1, value);
  };

  const handlePaginationPageChange = (value: number) => {
    setPaginationPage(value);
    getData(value, String(searchParams.get("category")));
  };

  const getData = async (page: number, categoryParam: string) => {
    setLoading(true);
    const response = (
      await api.getProducts({
        category: categoryParam,
        limit: loadingLength,
        page: page,
      })
    )[1];

    if (response) {
      setTotalPages(response.totalPages);
      setRows(response.products);
    }
    setLoading(false);
  };

  const handleSettingsClick = (item: IProductFromList) => {
    setDialogType("edit");
    setDialogItem(item);
    setOpenDialog(true);
  };

  const handleCreateClick = () => {
    setDialogItem(null);
    setDialogType("create");
    setOpenDialog(true);
  };

  const handleDialogSubmitItem = () => {
    setOpenDialog(false);
    handleChangeParams(String(searchParams.get("category")));
  };

  const handleDeleteClick = (item: IProductFromList) => {
    setDialogType("delete");
    setDialogItem(item);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleDeleteItem = async () => {
    if (dialogItem === null) return;
    await api.deleteProduct(dialogItem._id);
    setOpenDialog(false);
    handleChangeParams(String(searchParams.get("category")));
  };

  useEffect(() => {
    const categoryParam = searchParams.get("category");

    handleChangeParams(categoryParam ? String(categoryParam) : categories[0]);
  }, []);

  return (
    <>
      <div className="items-page__main">
        <nav className="items-page__main-nav">
          {categories.map((category) => (
            <div
              key={category}
              className={drawerActive(
                String(searchParams.get("category")) === category
              )}
              onClick={() => handleChangeParams(category)}
            >
              {categoryLabelChanger(category)}
            </div>
          ))}
        </nav>

        {/* main content start */}
        <main className="items-page__main-main">
          <div className="items-page__main-main-head">
            <Button variant="outlined" onClick={handleCreateClick}>
              Pridať nový produkt
            </Button>
          </div>

          <div className="items-page__main-main-main">
            <TableSkeletonLoaderLayout
              loading={loading}
              loadedContentLength={rows.length}
              length={loadingLength}
            >
              <ItemsTable
                rows={rows}
                handleSettingsClick={handleSettingsClick}
                handleDeleteClick={handleDeleteClick}
              />
            </TableSkeletonLoaderLayout>
          </div>

          <div className="items-page__main-main-pagination">
            {totalPages > 1 ? (
              <Pagination
                count={totalPages}
                size="large"
                page={paginationPage}
                onChange={(_, page) => handlePaginationPageChange(page)}
              />
            ) : null}
          </div>
        </main>
        {/* main content end */}
      </div>

      <Dialog open={openDialog} onClose={handleDialogClose}>
        {dialogType === "delete" ? (
          <AreYouShureDialog
            handleClose={handleDialogClose}
            handleYes={handleDeleteItem}
          />
        ) : dialogType === "edit" ? (
          <CreateOrEditItemDialog
            item={dialogItem}
            handleClose={handleDialogClose}
            handleYes={handleDialogSubmitItem}
            title={'Editovať "' + dialogItem?.title + '"'}
          />
        ) : dialogType === "create" ? (
          <CreateOrEditItemDialog
            item={null}
            handleClose={handleDialogClose}
            handleYes={handleDialogSubmitItem}
            title="Pridať nový produkt"
          />
        ) : (
          <></>
        )}
      </Dialog>
    </>
  );
}
