export interface GetProductsRequestType {
  category: string;
  page: number;
  limit: number;
}

export interface CreateOrUpdateProductRequestType {
  title: string;
  desc: string;
  img: string;
  category: string;
  brand: string;
  price: string;
}
