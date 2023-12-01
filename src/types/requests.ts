export interface GetProductsRequestType {
  category: string;
  page: number;
  limit: number;
}

export interface GetOrdersRequestType {
  page: number;
  limit: number;
}

export interface CreateOrUpdateProductRequestType {
  title?: string;
  desc?: string;
  img?: string;
  category?: string;
  brand?: string;
  price?: number;
}
