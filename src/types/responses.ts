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

export interface GetProductsResponseType {
  currentPage: number;
  products: IProductFromList[];
  totalCount: number;
  totalPages: number;
}
