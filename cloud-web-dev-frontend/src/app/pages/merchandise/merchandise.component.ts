import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { MerchItem } from '../../interfaces/merch-item';
import { MerchService } from '../../services/merch.service';
import { MatDividerModule } from '@angular/material/divider';
import { Subscription } from 'rxjs';
import { ShoppingCartItem } from '../../interfaces/shopping-cart-item';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { OrderDialog } from '../../dialogs/order-dialog';
import { OrderService } from '../../services/order.service';
import { OrderData } from '../../interfaces/order-data';

@Component({
  selector: 'app-merchandise',
  standalone: true,
  imports: [CommonModule, MatDividerModule, MatButtonModule, MatIconModule],
  templateUrl: './merchandise.component.html',
  styleUrl: './merchandise.component.css',
})
export class MerchandiseComponent implements OnDestroy {
  protected shoppingCart: Array<ShoppingCartItem> = [];
  protected merchItems: Array<MerchItem> = [];

  private shoppingCartSubscription: Subscription;

  constructor(
    private merchService: MerchService,
    private dialog: MatDialog,
    private orderService: OrderService
  ) {
    this.merchService.getAllMerchItems().subscribe((data: Array<MerchItem>) => {
      this.merchItems = data;
      
    })

    this.shoppingCartSubscription = merchService
      .getShoppingCartObservable()
      .subscribe((newSchoppingCart: Array<ShoppingCartItem>) => {
        this.shoppingCart = newSchoppingCart;
      });
  }

  ngOnDestroy(): void {
    this.shoppingCartSubscription.unsubscribe();
  }

  protected addToCart(merchItem: MerchItem): void {
    this.merchService.addToCart(merchItem);
  }

  protected removeFromCart(itemId: string): void {
    this.merchService.removeItemFromCart(itemId);
  }

  protected clearCart(): void {
    this.merchService.clearCart();
  }

  protected openOrderDialog(): void {
    let totalPrice: number = 0;
    this.shoppingCart.forEach((shoppingCartItem) => {
      totalPrice += shoppingCartItem.price * shoppingCartItem.quantity;
    });
    const dialogRef = this.dialog.open(OrderDialog, {
      data: { price: totalPrice },
    });

    dialogRef.afterClosed().subscribe((personalInformation) => {
      if (!personalInformation) {
        return;
      }

      if (
        personalInformation.name &&
        personalInformation.address &&
        personalInformation.email
      ) {
        const orderData: OrderData = {
          customerName: personalInformation.name,
          address: personalInformation.address,
          items: this.shoppingCart,
          totalPrice: totalPrice,
          mail: personalInformation.email,
        };
        this.orderService.executeOrder(orderData).subscribe();
        this.clearCart();
      }
    });
  }
}
