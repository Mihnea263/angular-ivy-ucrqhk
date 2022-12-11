import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { Product } from '../common/product';

import { ProductCategory } from '../common/product-category';



@Injectable({ providedIn: 'root' })
export class ProductService {
  


  private baseUrl = 'http://localhost:8080/api/products';
  private categoryUrl = 'http://localhost:8080/api/product-category';

  constructor(private httpClient: HttpClient) { }

  getProductCategories(): Observable<ProductCategory[]> {
    return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
      map(response => response._embedded.productCategory)
    );
  }

  getProductList(theCategoryId: number): Observable<Product[]> {

    const url = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;

    return this.httpClient.get<GetResponse>(url).pipe(map(response => response._embedded.products));
  }

  searchProducts(theKeyword:string):Observable<Product[]>{
    const searchUrl=`${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`;
    return this.httpClient.get<getResponseProduct>(searchUrl)
    .pipe(map(response=>response._embedded.products));
  }

  getProduct(theProductId: number):Observable<Product> {
    const productUrl=`${this.baseUrl}/${theProductId}`;
    return this.httpClient.get<Product>(productUrl);
  }

  getProductListPaginate(thePage:number,thePageSize:number,theCategoryId: number): Observable<getResponseProduct> {

    const url = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`
    +`&page=${thePage}&size=${thePageSize}`;

    return this.httpClient.get<getResponseProduct>(url);
  }

  searchProductListPaginate(thePage:number,thePageSize:number,theKeyword:string): Observable<getResponseProduct> {

    const url = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`;
    +`&page=${thePage}&size=${thePageSize}`;

    return this.httpClient.get<getResponseProduct>(url);
  }



}

  interface GetResponse {
  _embedded: {
    products: Product[];
  }
}


interface GetResponseProductCategory {
  _embedded: {
    productCategory: ProductCategory[];
  }
}

interface getResponseProduct{
  _embedded:{
    products:Product[];
  }
  page:{
    size:number,
    totalElements:number,
    totalPages:number,
    number:number
  }
}
