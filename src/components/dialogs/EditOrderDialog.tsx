import { useEffect, useMemo, useState } from "react";

import { TextField, Button, Autocomplete } from "@mui/material";

// import { categories } from "../../utils/categories.ts";
import { api } from "../../utils/api.ts";
// import { CreateOrUpdateProductRequestType } from "../../types/requests.ts";
import { IOrderItem, IProductFromList } from "../../types/responses.ts";
import { mainShopUrl } from "../../utils/mainShopUrl.ts";

import PromptOverlayLayout from "../layouts/PromptOverlayLayout.tsx";

import "../../scss/pages/_orders-page.scss";

const renameTopEntries = (key: string) => {
  switch (key) {
    case "userNameSurname":
      return "Meno/Priezvisko";
    case "userEmail":
      return "Email";
    case "userAddress":
      return "Adresa";
    case "userCity":
      return "Mesto";
    case "userCountry":
      return "Krajina";
    case "userZip":
      return "PSČ";
    case "userPhone":
      return "Telefónne číslo";
    case "orderAmount":
      return "Celková cena";
    case "orderApartment":
      return "Byt";
    case "orderStatus":
      return "Status";
    default:
      return "";
  }
};

interface IStateOrderItem {
  item: IProductFromList;
  quantity: number;
}

interface IComponentProps {
  item: IOrderItem;
  title: string;
  handleClose: () => void;
  handleYes: () => void;
}

export default function EditOrderDialog({
  item,
  title,
  handleClose,
  handleYes,
}: IComponentProps) {
  //top

  const topState = useMemo(
    () => ({
      userNameSurname: `${item.name} ${item.surname}`,
      userEmail: item.email,
      userAddress: item.address,
      userCity: item.city,
      userCountry: item.country,
      userZip: item.postalCode,
      userPhone: item.phone,
      orderAmount: item.amount,
      orderApartment: item.apartment,
      orderStatus: item.status,
    }),
    [item]
  );

  //status
  const [orderStatus, setOrderStatus] = useState("");
  const orderStatuses = ["nová", "v spracovaní", "dokončená", "zrušená"];
  //bottom
  const [orderItems, setOrderItems] = useState<IStateOrderItem[]>([]);

  const getOrderItems = async () => {
    const productIds = item.products
      .map((product) => product.productId)
      .join(",");

    const response = (await api.getProductById(productIds))[1];

    if (response) {
      setOrderItems(
        response.map((product) => {
          const quantity =
            item.products.find((item) => item.productId === product._id)
              ?.quantity || 0;
          return {
            item: product,
            quantity: quantity,
          };
        })
      );
    }
  };

  const handleSubmit = async () => {
    // await editItem();

    handleYes();
  };

  const handleOpenItem = (id: string) => {
    window.open(mainShopUrl + "/en/item/" + id, "_blank");
  };

  useEffect(() => {
    getOrderItems();
  }, []);

  return (
    <PromptOverlayLayout
      handleClose={handleClose}
      handleYes={handleSubmit}
      disableActions
      width={600}
      title={title}
    >
      <>
        <div className="_orders-page__dialog-top">
          {Object.entries(topState).map(([key, value]) => (
            <div className="_orders-page__dialog-top-item">
              <div className="_orders-page__dialog-top-item-key">
                {renameTopEntries(key)}:
              </div>
              <div className="_orders-page__dialog-top-item-value">{value}</div>
            </div>
          ))}
        </div>
        <div className="_orders-page__dialog-status">
          <Autocomplete
            id="free-solo-demo"
            freeSolo
            value={orderStatus}
            onChange={(_, value) => setOrderStatus(value || "")}
            options={orderStatuses.map((option) => option)}
            renderInput={(params) => (
              <TextField
                onChange={(e) => setOrderStatus(e.target.value)}
                {...params}
                label="Status"
              />
            )}
          />
          <Button
            sx={{ marginTop: "10px" }}
            fullWidth
            disabled={orderStatus === item.status}
            onClick={() => {}}
          >
            Uložiť stav
          </Button>
        </div>
        <div className="_orders-page__dialog-bottom">
          {orderItems.map((item) => (
            <div
              className="_orders-page__dialog-bottom-item"
              key={item.item._id}
              onClick={() => handleOpenItem(item.item._id)}
            >
              <div className="_orders-page__dialog-bottom-item-amount">
                {item.quantity}X
              </div>

              <div className="_orders-page__dialog-bottom-item-name">
                {[item.item.brand, item.item.title].join(", ")}
              </div>

              <div className="_orders-page__dialog-bottom-item-image">
                <img
                  src={item.item.img}
                  className="_orders-page__dialog-bottom-item-image-main"
                />
              </div>
            </div>
          ))}
        </div>
      </>
    </PromptOverlayLayout>
  );
}
