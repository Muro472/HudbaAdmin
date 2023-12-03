import { useEffect, useState } from "react";
import { api } from "../../utils/api";
import { IOrderItem } from "../../types/responses.ts";

import { Dialog } from "@mui/material";

import OrdersTable from "../../components/tables/OrdersTable.tsx";
import AreYouShureDialog from "../../components/dialogs/AreYouShureDialog.tsx";
import EditOrderDialog from "../../components/dialogs/EditOrderDialog.tsx";

import TableSkeletonLoaderLayout from "../../components/general/TableSkeletonLoaderLayout.tsx";

const loadingLength = 20;

export default function OrdersPage() {
  const [paginationPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [rows, setRows] = useState<IOrderItem[]>([]);
  const [dialogType, setDialogType] = useState<"delete" | "edit" | "">("");
  const [dialogItem, setDialogItem] = useState<IOrderItem | null>(null);
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const handleSettingsClick = (item: IOrderItem) => {
    setDialogType("edit");
    setDialogItem(item);
    setOpenDialog(true);
  };

  const handleDeleteClick = (item: IOrderItem) => {
    setDialogType("delete");
    setDialogItem(item);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleDialogSubmitItem = () => {
    getData(paginationPage);
    setOpenDialog(false);
  };

  const handleDeleteItem = async () => {
    if (dialogItem === null) return;
    await api.deleteOrder(dialogItem._id);
    setOpenDialog(false);
    getData(paginationPage);
  };

  const getData = async (page: number) => {
    setLoading(true);
    const response = (
      await api.getOrders({
        limit: loadingLength,
        page: page,
      })
    )[1];

    if (response) {
      // setTotalPages(response.totalPages);
      setRows(response);
    }
    setLoading(false);
  };

  useEffect(() => {
    getData(paginationPage);
  }, []);

  return (
    <>
      <div className="orders-page">
        <div className="orders-page-table">
          <TableSkeletonLoaderLayout
            loading={loading}
            loadedContentLength={rows.length}
            length={loadingLength}
          >
            <OrdersTable
              rows={rows}
              handleSettingsClick={handleSettingsClick}
              handleDeleteClick={handleDeleteClick}
            />
          </TableSkeletonLoaderLayout>
        </div>

        {/* <div className="orders-page-pagination">
        {totalPages > 1 ? (
          <Pagination
          count={totalPages}
          size="large"
          page={paginationPage}
          onChange={(_, page) => handlePaginationPageChange(page)}
          />
          ) : null}
        </div> */}
      </div>

      <Dialog open={openDialog} onClose={handleDialogClose}>
        {dialogType === "delete" ? (
          <AreYouShureDialog
            handleClose={handleDialogClose}
            handleYes={handleDeleteItem}
          />
        ) : dialogType === "edit" && dialogItem ? (
          <EditOrderDialog
            item={dialogItem}
            handleClose={handleDialogClose}
            handleYes={handleDialogSubmitItem}
            title={dialogItem.name + " " + dialogItem.surname}
          />
        ) : (
          <></>
        )}
      </Dialog>
    </>
  );
}
