import { AppApiService } from "./axios";

import {
  GetProductsRequestType,
  CreateOrUpdateProductRequestType,
  GetOrdersRequestType,
} from "../types/requests";

import {
  GetProductsResponseType,
  IProductFromList,
  GetOrdersResponseType,
} from "../types/responses";

class ApiService extends AppApiService {
  //products
  async getProducts(
    payload: GetProductsRequestType
  ): Promise<[null, GetProductsResponseType] | [unknown]> {
    return this.axiosCall<GetProductsResponseType>({
      method: "get",
      url: "/products",
      params: payload,
    });
  }

  async getProductById(
    id: string
  ): Promise<[null, IProductFromList[]] | [unknown]> {
    return this.axiosCall<IProductFromList[]>({
      method: "get",
      url: `/products/cart/${id}`,
    });
  }

  async createProduct(
    data: CreateOrUpdateProductRequestType
  ): Promise<[null, void] | [unknown]> {
    return this.axiosCall<void>({
      method: "post",
      url: "/products",
      data,
    });
  }

  async updateProduct(
    id: string,
    data: CreateOrUpdateProductRequestType
  ): Promise<[null, void] | [unknown]> {
    return this.axiosCall<void>({
      method: "put",
      url: `/products/${id}`,
      data,
    });
  }

  async deleteProduct(id: string): Promise<[null, void] | [unknown]> {
    return this.axiosCall<void>({
      method: "delete",
      url: `/products/${id}`,
    });
  }

  //orders

  async getOrders(
    payload: GetOrdersRequestType
  ): Promise<[null, GetOrdersResponseType] | [unknown]> {
    return this.axiosCall<GetOrdersResponseType>({
      method: "get",
      url: "/orders",
      params: payload,
    });
  }

  async editOrder(
    id: string,
    status: string
  ): Promise<[null, void] | [unknown]> {
    return this.axiosCall<void>({
      method: "put",
      url: `/orders/${id}`,
      data: { status },
    });
  }

  async deleteOrder(id: string): Promise<[null, void] | [unknown]> {
    return this.axiosCall<void>({
      method: "delete",
      url: `/orders/${id}`,
    });
  }
}

export const api = new ApiService();
