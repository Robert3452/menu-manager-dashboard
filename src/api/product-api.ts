import { menuManager } from "./httpClient";
const httpClient = menuManager;
export interface CreateProductDto {
  index: number;
  name: string;
  content: string;
  image: string | Blob | null;
  realPrice: number;
  corridorId: number;
  toppingCategories?: CreateToppingCategoryDto[];
}

export interface UpdateProductDto extends Partial<CreateProductDto> {}

export enum ToppingType {
  exclusive = "exclusive",
  inclusive = "inclusive",
}

export interface CreateToppingCategoryDto {
  title: string;
  subtitle?: string;
  minToppingsForCategory: number;

  maxToppingsForCategory: number;
  mandatory: boolean;
  toppingType: ToppingType;

  index: number;
  // @Type(() => CreateToppingDto)
  toppings: CreateToppingDto[];
}
export interface UpdateToppingDto extends Partial<CreateToppingDto> {}
export interface CreateToppingDto {
  available: boolean;
  title: string;
  price: number;
  required: boolean;
  index: number;
  maxLimit: number;
  toppingCategoryId: number;
}

export interface UpdateToppingCategoryDto
  extends Partial<CreateToppingCategoryDto> {}

class ProductsApi {
  async createProduct({ body: request }: { body: CreateProductDto }) {
    try {
      const token = window.localStorage.getItem("accessToken");

      let urlImage;
      const { image, ...body } = request;
      const {
        data: { data: newProduct },
      } = await httpClient.post("/products", body, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (image) {
        const { data } = await this.updateProductImage({
          productId: newProduct.id,
          image,
        });
        urlImage = data.data.image;
      }
      return {
        data: { ...newProduct, image: urlImage },
        message: "Product updated successfully",
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  async updateProduct({
    productId,
    body: request,
  }: {
    productId: number;
    body: UpdateProductDto;
  }) {
    try {
      const token = window.localStorage.getItem("accessToken");

      const { image, ...body } = request;
      let urlImage;
      if (image) {
        const { data } = await this.updateProductImage({ productId, image });
        urlImage = data.data.image;
      }
      const { data: response } = await httpClient.put(
        `/products/${productId}`,
        { ...body },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return {
        ...response,
        data: { ...response.data, image: urlImage || response.data.image },
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  async updateProductImage({
    productId,
    image,
  }: {
    productId: number;
    image: any;
  }) {
    const token = window.localStorage.getItem("accessToken");

    const formData = new FormData();
    formData.append("file", image);
    return await httpClient.put(`/products/${productId}/image`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
  }
  async deleteProduct({ productId }: { productId: number }) {
    const token = window.localStorage.getItem("accessToken");

    const { data } = await httpClient.delete(`/products/${productId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  }

  async getProductById({ productId }: { productId: number }) {
    const token = window.localStorage.getItem("accessToken");

    const { data } = await httpClient.get(`/products/${productId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  }
}

export const productsApi = new ProductsApi();
