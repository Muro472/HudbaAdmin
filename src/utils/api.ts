import { AppApiService } from "./axios";

import {
  GetProductsRequestType,
  CreateOrUpdateProductRequestType,
} from "../types/requests";

import { GetProductsResponseType } from "../types/responses";

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
      url: `/products`,
      data,
      params: { id },
    });
  }

  async deleteProduct(id: string): Promise<[null, void] | [unknown]> {
    return this.axiosCall<void>({
      method: "delete",
      url: `/products`,
      params: { id },
    });
  }

  //orders
}

export const api = new ApiService();
