import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Product } from '../common/product';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://localhost:8080/api/products';         // Products API
  private categoryUrl = 'http://localhost:8080/api/product-category'; // Product Categories API

  constructor(private httpClient: HttpClient) { }

  // Get the list of products from the REST API with pagination
  getAllProductList(thePage: number, thePageSize: number): Observable<GetResponseProducts> {

    const searchUrl = `${this.baseUrl}?page=${thePage}&size=${thePageSize}`;

    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }

  // Get the list of products from the REST API with pagination
  getProductList(thePage: number,
    thePageSize: number,
    theCategoryId: number): Observable<GetResponseProducts> {

    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`
      + `&page=${thePage}&size=${thePageSize}`;

    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }

  // Search for products based on the keyword
  searchProducts(thePage: number,
    thePageSize: number,
    theKeyword: string): Observable<GetResponseProducts> {

    // need to build URL based on keyword, page and size
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`
      + `&page=${thePage}&size=${thePageSize}`;

    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }

  // Get the product details from the REST API
  getProductDetails(theProductId: number): Observable<Product> {

    // Build URL based on product id
    const productUrl = `${this.baseUrl}/${theProductId}`;

    return this.httpClient.get<Product>(productUrl);
  }

  // Get the list of product categories from the REST API
  getProductCategories(): Observable<ProductCategory[]> {

    return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
      map(response => response._embedded.productCategory)
    );
  }

}

// Unwrapping the JSON response
interface GetResponseProducts {
  _embedded: {
    products: Product[];
  },
  page: {
    size: number,           // number of records in each page
    totalElements: number,  // total number of records
    totalPages: number,     // total number of pages
    number: number          // current page number
  }
}

interface GetResponseProductCategory {
  _embedded: {
    productCategory: ProductCategory[];
  }
}
