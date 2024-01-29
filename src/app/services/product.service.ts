import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product';
import { Injectable } from '@angular/core';
import { Observable, delay, map, tap } from 'rxjs';
import { user } from '@angular/fire/auth';
import { getDatabase, ref, set, update } from 'firebase/database';
import { Company } from '../models/company';
//Local Service  injectable içi boş ya
@Injectable()
export class ProductService {
  private url = 'https://ng-shopapp-fc436-default-rtdb.firebaseio.com/';
  constructor(private http: HttpClient) {}

  getProducts(categoryId: number): Observable<Product[]> {
    // Observable özel bir türdür subscribe methodu kullanıcaz o yüzden gereklidir
    return this.http.get<Product[]>(this.url + 'products.json').pipe(
      map((data) => {
        const products: Product[] = [];
        for (const key in data) {
          if (categoryId) {
            if (categoryId == data[key].categoryId) {
              products.push({ ...data[key], id: key });
            }
          } else {
            products.push({ ...data[key], id: key });
          }
        }
        return products.reverse(); //yani şöyle yaptık yeni eklenen yeni gelecek
      }),
      tap(),
      // (data) => console.log(data)
      delay(1000)
    );
  }

  getProductsAll(): Observable<Product[]> {
    // Observable özel bir türdür subscribe methodu kullanıcaz o yüzden gereklidir
    return this.http.get<Product[]>(this.url + 'products.json').pipe(
      map((data) => {
        const products: Product[] = [];
        for (const key in data) {
          products.push({ ...data[key], id: key });
        }
        return products.reverse(); //yani şöyle yaptık yeni eklenen yeni gelecek
      }),
      tap(),
      // (data) => console.log(data)
      delay(1000)
    );
  }
  //map gelen listeyi değiştrmek için kullanıldı
  //tap gelen datayı console da ya da başka bir işlevde kullanak için (gerekli değil)
  //  delay(1000) ise gelecek datanın gelme süresini geciktiriyoruz
  getProductById(id: string): Observable<Product> {
    return this.http
      .get<Product>(this.url + 'products/' + id + '.json')
      .pipe(delay(1000));
  }
  setProductIsActive(product: Product) {
    product.isActive = false;
    console.log(product.isActive);
    const db = getDatabase();

    const updates: any = {};
    updates['/products/' + product.id] = product;

    return update(ref(db), updates);
  }

  setEditProduct(product: Product) {
    const db = getDatabase();

    const updates: any = {};
    updates['/products/' + product.id] = product;

    return update(ref(db), updates);
  }

  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.url + 'products.json', product); // <post edilen bilginin tipi>
  }

  getProductsFiltered(
    categoryId: number,
    citySelected: string,
    districtSelected: string,
    quarterselected: string,
    pricefree: string,
    pricesale: string,
    firstnew: string,
    firstold: string
  ): Observable<Product[]> {
    // Observable özel bir türdür subscribe methodu kullanıcaz o yüzden gereklidir
    return this.http.get<Product[]>(this.url + 'products.json').pipe(
      map((data) => {
        const products: Product[] = [];
        for (const key in data) {
          let pdata = data[key];
          if (categoryId) {
            if (categoryId == pdata.categoryId) {
              if (pricefree == 'true') {
                if (pdata.priceFree == 'true') {
                  if (citySelected != '0') {
                    if (pdata.city == citySelected) {
                      if (districtSelected != '0') {
                        if (pdata.district == districtSelected) {
                          if (quarterselected != '0') {
                            if (quarterselected == pdata.quarter) {
                              products.push({ ...pdata, id: key });
                            }
                          } else {
                            products.push({ ...pdata, id: key });
                          }
                        }
                      } else {
                        products.push({ ...pdata, id: key });
                      }
                    }
                  } else {
                    products.push({ ...pdata, id: key });
                  }
                }
              } else if (pricesale == 'true') {
                if (pdata.priceFree == 'false') {
                  if (citySelected != '0') {
                    if (pdata.city == citySelected) {
                      if (districtSelected != '0') {
                        if (pdata.district == districtSelected) {
                          if (quarterselected != '0') {
                            if (quarterselected == pdata.quarter) {
                              products.push({ ...pdata, id: key });
                            }
                          } else {
                            products.push({ ...pdata, id: key });
                          }
                        }
                      } else {
                        products.push({ ...pdata, id: key });
                      }
                    }
                  } else {
                    products.push({ ...pdata, id: key });
                  }
                }
              } else {
                if (citySelected != '0') {
                  if (pdata.city == citySelected) {
                    if (districtSelected != '0') {
                      if (pdata.district == districtSelected) {
                        if (quarterselected != '0') {
                          if (quarterselected == pdata.quarter) {
                            products.push({ ...pdata, id: key });
                          }
                        } else {
                          products.push({ ...pdata, id: key });
                        }
                      }
                    } else {
                      products.push({ ...pdata, id: key });
                    }
                  }
                } else {
                  products.push({ ...pdata, id: key });
                }
              }
            }
          } else {
            products.push({ ...data[key], id: key });
          }
        }

        if (firstold == 'true') {
          return products;
        } else {
          return products.reverse();
        }
      }),
      tap(),
      //(data) => console.log(data)
      delay(1000)
    );
  }

  getProductsFilteredAll(
    citySelected: string,
    districtSelected: string,
    quarterselected: string,
    pricefree: string,
    pricesale: string,
    firstnew: string,
    firstold: string
  ): Observable<Product[]> {
    // Observable özel bir türdür subscribe methodu kullanıcaz o yüzden gereklidir
    return this.http.get<Product[]>(this.url + 'products.json').pipe(
      map((data) => {
        let products: Product[] = [];
        for (const key in data) {
          let pdata = data[key];

          if (pricefree == 'true') {
            if (pdata.priceFree == 'true') {
              if (citySelected != '0') {
                if (pdata.city == citySelected) {
                  if (districtSelected != '0') {
                    if (pdata.district == districtSelected) {
                      if (quarterselected != '0') {
                        if (quarterselected == pdata.quarter) {
                          products.push({ ...pdata, id: key });
                        }
                      } else {
                        products.push({ ...pdata, id: key });
                      }
                    }
                  } else {
                    products.push({ ...pdata, id: key });
                  }
                }
              } else {
                products.push({ ...pdata, id: key });
              }
            }
          } else if (pricesale == 'true') {
            if (pdata.priceFree == 'false') {
              if (citySelected != '0') {
                if (pdata.city == citySelected) {
                  if (districtSelected != '0') {
                    if (pdata.district == districtSelected) {
                      if (quarterselected != '0') {
                        if (quarterselected == pdata.quarter) {
                          products.push({ ...pdata, id: key });
                        }
                      } else {
                        products.push({ ...pdata, id: key });
                      }
                    }
                  } else {
                    products.push({ ...pdata, id: key });
                  }
                }
              } else {
                products.push({ ...pdata, id: key });
              }
            }
          } else {
            if (citySelected != '0') {
              if (pdata.city == citySelected) {
                if (districtSelected != '0') {
                  if (pdata.district == districtSelected) {
                    if (quarterselected != '0') {
                      if (quarterselected == pdata.quarter) {
                        products.push({ ...pdata, id: key });
                      }
                    } else {
                      products.push({ ...pdata, id: key });
                    }
                  }
                } else {
                  products.push({ ...pdata, id: key });
                }
              }
            } else {
              products.push({ ...pdata, id: key });
            }
          }
        }
        let sortedProducts = products.sort((a, b) => {
          let dateA = new Date(a.adDate.split('.').reverse().join('-'));
          let dateB = new Date(b.adDate.split('.').reverse().join('-'));
          if (dateA.getTime() === dateB.getTime()) {
            // Tarihler eşitse, isimlere göre sırala
            return a.name.localeCompare(b.name);
          }
          return dateA.getTime() - dateB.getTime();
        });
        products = sortedProducts;

        if (firstold == 'true') {
          return products;
        } else {
          return products.reverse();
        }
      }),
      tap(),
      //(data) => console.log(data)
      delay(1000)
    );
  }

  getProductByNum(adNo: string): Observable<Product[]> {
    return this.http.get<Product[]>(this.url + 'products.json').pipe(
      map((data) => {
        const products: Product[] = [];
        for (const key in data) {
          if (adNo) {
            if (adNo == data[key].adNo) {
              products.push({ ...data[key], id: key });
            }
          } else {
            products.push({ ...data[key], id: key });
          }
        }
        return products.reverse(); //yani şöyle yaptık yeni eklenen yeni gelecek
      }),
      tap(),
      //(data) => console.log(data)
      delay(1000)
    );
  }

  getMyProducts(userId: string): Observable<Product[]> {
    // Observable özel bir türdür subscribe methodu kullanıcaz o yüzden gereklidir
    return this.http.get<Product[]>(this.url + 'products.json').pipe(
      map((data) => {
        const products: Product[] = [];
        for (const key in data) {
          if (userId == data[key].userId) {
            products.push({ ...data[key], id: key });
          }
        }
        return products.reverse(); //yani şöyle yaptık yeni eklenen yeni gelecek
      }),
      tap(),
      // (data) => console.log(data)
      delay(1000)
    );
  }

  createCompany(company: Company): Observable<Company> {
    return this.http.post<Company>(this.url + 'company.json', company); // <post edilen bilginin tipi>
  }
  getCompanies(): Observable<Company[]> {
    return this.http.get<Company[]>(this.url + 'company.json').pipe(
      map((data) => {
        const companies: Company[] = [];
        for (const key in data) {
          companies.push({ ...data[key], id: key });
        }
        return companies.reverse(); //yani şöyle yaptık yeni eklenen yeni gelecek
      }),
      tap(),
      // (data) => console.log(data)
      delay(1000)
    );
  }

  getCompanyFiltered(citySelected: string): Observable<Company[]> {
    return this.http.get<Company[]>(this.url + 'company.json').pipe(
      map((data) => {
        const companies: Company[] = [];
        if (citySelected != '0') {
          for (const key in data) {
            let cdata = data[key];
            console.log(cdata);

            if (cdata.city == citySelected) {
              console.log(cdata);

              companies.push({ ...cdata, id: key });
            }
          }
          return companies;
        } else {
          for (const key in data) {
            companies.push({ ...data[key], id: key });
          }
          return companies;
        }
      }),
      tap(),
      delay(1000)
    );
  }

  getCompanyFilteredWithDistrict(
    citySelected: string,
    districtSelected: string
  ): Observable<Company[]> {
    return this.http.get<Company[]>(this.url + 'company.json').pipe(
      map((data) => {
        const companies: Company[] = [];
        if (citySelected != '0') {
          for (const key in data) {
            let cdata = data[key];
            if (cdata.city == citySelected) {
              if (districtSelected != '0') {
                if (cdata.district == districtSelected) {
                  companies.push({ ...cdata, id: key });
                }
              }
            }
          }
          return companies;
        } else {
          for (const key in data) {
            companies.push({ ...data[key], id: key });
          }
          return companies;
        }
      }),
      tap(),
      delay(1000)
    );
  }

  setCompanyIsActive(company: Company) {
    company.isActive = false;
    console.log(company.isActive);
    const db = getDatabase();

    const updates: any = {};
    updates['/company/' + company.id] = company;

    return update(ref(db), updates);
  }
}
