import { Injectable } from '@angular/core';
import { MerchItem } from '../interfaces/merch-item';
import { BehaviorSubject, Observable } from 'rxjs';
import { ShoppingCartItem } from '../interfaces/shopping-cart-item';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MerchService {
  private shoppingCartSubject: BehaviorSubject<Array<ShoppingCartItem>> =
    new BehaviorSubject<Array<ShoppingCartItem>>([]);

  constructor(private http: HttpClient) {
    this.getShoppingCart().subscribe(
      (stringifiedCart) => {
        try {
          const shoppingCart: Array<ShoppingCartItem> = JSON.parse(stringifiedCart);
          this.shoppingCartSubject.next(shoppingCart);
        } catch {
          this.shoppingCartSubject.next([]);
        }
      },
      (error) => {
        console.error("Error while getting Shopping Cart: ", error);
      }
    );
  }

  public getAllMerchItems(): Observable<Array<MerchItem>> {
    return this.http.get<Array<MerchItem>>('http://localhost:3000/');
  }

  public getShoppingCartObservable(): Observable<Array<ShoppingCartItem>> {
    return this.shoppingCartSubject.asObservable();
  }

  public addToCart(merchItem: MerchItem): void {
    const currentCart = this.shoppingCartSubject.value;
    const itemIndex = currentCart.findIndex((item) => item.id == merchItem.id);

    if (itemIndex > -1) {
      currentCart[itemIndex].quantity += 1;
    } else {
      currentCart.push({
        name: merchItem.name,
        id: merchItem.id,
        price: merchItem.price,
        quantity: 1,
      });
    }

    this.updateShoppingCartCache(currentCart).subscribe();
    this.shoppingCartSubject.next(currentCart);
  }

  public removeItemFromCart(itemId: string): void {
    const currentItems = this.shoppingCartSubject.value;
    const updatedItems = currentItems.filter((item) => item.id !== itemId);
    
    this.updateShoppingCartCache(updatedItems).subscribe();
    this.shoppingCartSubject.next(updatedItems);
  }

  public clearCart(): void {
    this.shoppingCartSubject.next([]);
    this.clearShoppingCartCache().subscribe();
  }

  private getShoppingCart(): Observable<string> {
    return this.http.get<string>('http://localhost:3010/');
  }

  private updateShoppingCartCache(shoppingCart: Array<ShoppingCartItem>): Observable<string> {    
    return this.http.post<string>('http://localhost:3010/', { value: JSON.stringify(shoppingCart) });
  }

  private clearShoppingCartCache(): Observable<string> {
    return this.http.get<string>('http://localhost:3010/clearCache');
  }
}
