import { Product } from './product';

export class ProductRepository {
  // private products: Product[] = [
  //   {
  //     id: 1,
  //     name: 'Iphone 14',
  //     price: 20000,
  //     imageUrl: '1.jpeg',
  //     isActive: true,
  //     description: 'Iphone telefon description',
  //     categoryId: 1,
  //   },
  //   {
  //     id: 2,
  //     name: 'Iphone 15',
  //     price: 30000,
  //     imageUrl: '2.jpeg',
  //     isActive: true,
  //     description: 'Iphone telefon description',
  //     categoryId: 1,
  //   },
  //   {
  //     id: 3,
  //     name: 'Iphone 16',
  //     price: 40000,
  //     imageUrl: '3.jpeg',
  //     isActive: true,
  //     description: 'Iphone telefon description',
  //     categoryId: 1,
  //   },
  //   {
  //     id: 4,
  //     name: 'Iphone 17',
  //     price: 40000,
  //     imageUrl: '3.jpeg',
  //     isActive: true,
  //     description: 'Iphone telefon description',
  //     categoryId: 2,
  //   },
  //   {
  //     id: 5,
  //     name: 'Iphone 18',
  //     price: 40000,
  //     imageUrl: '3.jpeg',
  //     isActive: true,
  //     description: 'Iphone telefon description',
  //     categoryId: 2,
  //   },
  //   {
  //     id: 6,
  //     name: 'Iphone 19',
  //     price: 40000,
  //     imageUrl: '3.jpeg',
  //     isActive: true,
  //     description: 'Iphone telefon description',
  //     categoryId: 3,
  //   },
  // ];
  // getProducts(): Product[] {
  //   //product dizisi döndürecek demiş oluyoruz
  //   return this.products.filter((p) => p.isActive);
  //   //filter bir dizi gönderir uyan arama sonucunu
  // }
  // getProductsById(id: number) {
  //   //product veya undefied döndürür
  //   return this.products.find((p) => p.id == id);
  //   // find ise product veya undefined gönderir
  // }
  // getProductsByCategoryId(id: number): Product[] {
  //   //product veya undefied döndürür
  //   return this.products.filter((p) => p.categoryId == id);
  //   // find ise product veya undefined gönderir
  // }
}
