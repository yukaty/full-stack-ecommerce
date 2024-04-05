import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../common/product';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  previousCategoryId: number = 1;
  currentCategoryId: number = 1;
  currentCategoryName: string = "";
  searchMode: boolean = false; // true when searching by keyword
  previousKeyword: string = "";

  // for pagination
  thePageNumber: number = 1;
  thePageSize: number = 10;
  theTotalElements: number = 0;


  constructor(private productService: ProductService,
    private route: ActivatedRoute) { }

  // Angular lifecycle hook that is called after the constructor
  ngOnInit() {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }

  // Called when the user clicks on the pagination buttons
  listProducts() {

    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if (this.searchMode) {
      this.handleSearchProducts();
    }
    else {
      this.handlelistProducts();
    }
  }

  // Search for products based on keyword
  handleSearchProducts() {

    const theKeyword: string = this.route.snapshot.paramMap.get('keyword')!;

    // if the keyword is different from previous
    if (this.previousKeyword != theKeyword) {
      this.thePageNumber = 1;
    }

    this.previousKeyword = theKeyword;

    console.log(`keyword=${theKeyword}, thePageNumber=${this.thePageNumber}`);

    // call API
    this.productService.searchProducts(this.thePageNumber - 1,
      this.thePageSize,
      theKeyword).subscribe(this.processResult());
  }
  // Get list of products
  handlelistProducts() {
    // check if "id" parameter is available
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if (hasCategoryId) {
      // get the "id" param string. convert string to a number using the "+" symbol
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
      // get the "name" param string
      this.currentCategoryName = this.route.snapshot.paramMap.get('name')!;
    }
    else {
      // no category id is provided ... use default to fetch all products
      this.currentCategoryId = 0;
      this.currentCategoryName = 'All Products';
    }

    // set the PageNumber back to 1 if the given category id is different from previous one
    if (this.previousCategoryId != this.currentCategoryId) {
      this.thePageNumber = 1;
    }
    this.previousCategoryId = this.currentCategoryId;

    // If currentCategoryId is 0, fetch all products
    if (this.currentCategoryId === 0) {
      this.productService.getAllProductList(
        this.thePageNumber - 1, // Adjust for 0-based page index
        this.thePageSize
      ).subscribe(this.processResult());
    } else {
      // get the product list for the given category id
      this.productService.getProductList(
        this.thePageNumber - 1, // Adjust for 0-based page index
        this.thePageSize,
        this.currentCategoryId
      ).subscribe(this.processResult());
    }
  }

  // Return after unwrapping the JSON response
  processResult() {
    return (data: any) => {
      this.products = data._embedded.products;
      this.thePageNumber = data.page.number + 1;
      this.thePageSize = data.page.size;
      this.theTotalElements = data.page.totalElements;
    };
  }

  // Update the page size when user changes it
  updatePageSize(pageSize: string) {
    this.thePageSize = +pageSize;
    this.thePageNumber = 1;
    this.listProducts();
  }
}
