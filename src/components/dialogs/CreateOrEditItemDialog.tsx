import { useEffect, useState } from "react";
import { IProductFromList } from "../../types/responses";

import { TextField, MenuItem, Button } from "@mui/material";

import { categories } from "../../utils/categories.ts";
import { api } from "../../utils/api.ts";
import { CreateOrUpdateProductRequestType } from "../../types/requests.ts";
import { categoryLabelChanger } from "../../utils/categoryLabelChanger.ts";
import { mainShopUrl } from "../../utils/mainShopUrl.ts";

import PromptOverlayLayout from "../layouts/PromptOverlayLayout.tsx";
import { useSearchParams } from "react-router-dom";

interface IComponentProps {
  item: IProductFromList | null;
  title: string;
  handleClose: () => void;
  handleYes: () => void;
}

export default function CreateOrEditItemDialog({
  item,
  title,
  handleClose,
  handleYes,
}: IComponentProps) {
  const [searchParams] = useSearchParams();
  const [itemTitle, setItemTitle] = useState<string>("");
  const [itemBrand, setItemBrand] = useState<string>("");
  const [itemImage, setItemImage] = useState<string>("");
  const [itemDesc, setItemDesc] = useState<string>("");
  const [itemPrice, setItemPrice] = useState<number>(0);
  const [itemCategory, setItemCategory] = useState<string>("");

  const editItem = async () => {
    if (!item) return;
    const params: CreateOrUpdateProductRequestType = {};

    if (itemTitle !== item.title) params.title = itemTitle;
    if (itemBrand !== item.brand) params.brand = itemBrand;
    if (itemImage !== item.img) params.img = itemImage;
    if (itemDesc !== item.desc) params.desc = itemDesc;
    if (itemPrice !== item.price) params.price = itemPrice;
    if (itemCategory !== item.category) params.category = itemCategory;

    await api.updateProduct(item._id, params);
  };

  const createItem = async () => {
    const params: CreateOrUpdateProductRequestType = {
      title: itemTitle,
      brand: itemBrand,
      img: itemImage,
      desc: itemDesc,
      price: itemPrice,
      category: itemCategory,
    };

    await api.createProduct(params);
  };

  const openPrewiew = () => {
    const queryParams: { [key: string]: string } = {
      brand: itemBrand,
      title: itemTitle,
      img: itemImage,
      desc: itemDesc,
      price: String(itemPrice),
    };

    const queryString = Object.keys(queryParams)
      .map(
        (key) =>
          encodeURIComponent(key) + "=" + encodeURIComponent(queryParams[key])
      )
      .join("&");

    window.open(mainShopUrl + "/en/admin/demo?" + queryString, "_blank");
  };

  const handleSubmit = async () => {
    if (item) {
      await editItem();
    } else {
      await createItem();
    }
    handleYes();
  };

  useEffect(() => {
    if (item) {
      setItemTitle(item.title);
      setItemBrand(item.brand);
      setItemImage(item.img);
      setItemDesc(item.desc);
      setItemPrice(item.price);
      setItemCategory(item.category);
      return;
    }
    setItemCategory(String(searchParams.get("category")));
  }, []);

  return (
    <PromptOverlayLayout
      handleClose={handleClose}
      handleYes={handleSubmit}
      width={500}
      title={title}
      optionalButton={<Button onClick={openPrewiew}>Otvoriť náhľad</Button>}
    >
      <>
        <TextField
          value={itemTitle}
          onChange={(e) => setItemTitle(e.target.value)}
          label="Title"
          fullWidth
          margin="normal"
        />
        <TextField
          value={itemBrand}
          onChange={(e) => setItemBrand(e.target.value)}
          label="Brand"
          fullWidth
          margin="normal"
        />
        <TextField
          value={itemImage}
          onChange={(e) => setItemImage(e.target.value)}
          label="Image"
          fullWidth
          margin="normal"
        />
        <TextField
          value={itemDesc}
          onChange={(e) => setItemDesc(e.target.value)}
          label="Description"
          fullWidth
          margin="normal"
        />
        <TextField
          value={itemPrice}
          onChange={(e) => setItemPrice(Number(e.target.value))}
          label="Price"
          fullWidth
          margin="normal"
        />
        <TextField
          value={itemCategory}
          onChange={(e) => setItemCategory(e.target.value)}
          label="Category"
          fullWidth
          select
          margin="normal"
        >
          {categories.map((category) => (
            <MenuItem key={category} value={category}>
              {categoryLabelChanger(category)}
            </MenuItem>
          ))}
        </TextField>
      </>
    </PromptOverlayLayout>
  );
}
