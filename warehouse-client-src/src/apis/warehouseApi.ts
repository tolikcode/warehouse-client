import urlJoin from 'url-join';
import { config } from '../config';
import { request } from './request';

export interface ProductDto {
  id: string;
  name: string;
  quantity: number;
}

export interface ArticleDto {
  id: number;
  name: string;
  stock: number;
}

export interface UpdateProductDto {
  name: string;
  productArticles: ProductArticleDto[];
}

export interface ProductArticleDto {
  articleId: number;
  quantityRequired: number;
}

const apiUrl = config.warehouseApiBaseUrl;

export async function patchArticles(articles: ArticleDto[]) {
  await request('PATCH', urlJoin(apiUrl, 'articles'), articles);
}

export const getProducts = async (): Promise<ProductDto[]> => {
  const response = await request('GET', urlJoin(apiUrl, 'products'));
  return await response.json();
};

export const postProductSell = async (productId: string): Promise<any> => {
  await request('POST', urlJoin(apiUrl, 'products', productId, 'sale'));
};

export async function patchProducts(products: UpdateProductDto[]) {
  await request('PATCH', urlJoin(apiUrl, 'products'), products);
}
