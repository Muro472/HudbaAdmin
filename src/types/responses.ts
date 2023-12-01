export interface IProductFromList {
  brand: string;
  category: string;
  createdAt: string;
  desc: string;
  img: string;
  price: number;
  title: string;
  updatedAt: string;
  __v: number;
  _id: string;
}

export interface IProductFromOrder {
  productId: string;
  quantity: number;
  _id: string;
}

export interface IOrderItem {
  address: string;
  amount: 678;
  apartment: string;
  city: string;
  country: string;
  createdAt: string;
  email: string;
  name: string;
  phone: string;
  postalCode: string;
  products: IProductFromOrder[];
  status: string;
  surname: string;
  updatedAt: string;
  __v: 0;
  _id: string;
}

export type GetOrdersResponseType = IOrderItem[];

export interface GetProductsResponseType {
  currentPage: number;
  products: IProductFromList[];
  totalCount: number;
  totalPages: number;
}
