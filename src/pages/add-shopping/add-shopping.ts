import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ShoppingItem } from '../../models/shopping-item/shopping-item.interface';
import { AngularFireDatabase, AngularFireList  } from 'angularfire2/database';

@IonicPage()
@Component({
  selector: 'page-add-shopping',
  templateUrl: 'add-shopping.html',
})
export class AddShoppingPage {

  // Creating a new Opject, uses the Interface of a ShoppingItem
  shoppingItem = {} as ShoppingItem;

  //  Reference to ShoppingItemList in Firebase Database
  shoppingItemRef$: AngularFireList<ShoppingItem>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private database: AngularFireDatabase){
    this.shoppingItemRef$ = this.database.list('shopping-list');

    /*
      shopping-list:
        0:  
          itemName: 'Pizza',
          itemNumber: 1
        1:
          itemName: 'Pizza',
          itemNumber: 1
    */
  }

  addShoppingItem(shoppingItem : ShoppingItem){
    
    this.shoppingItemRef$.push({
      itemName: this.shoppingItem.itemName,
      itemNumber: Number(this.shoppingItem.itemNumber)
    });

    // Resets the ShoppingItem
    this.shoppingItem = {} as ShoppingItem;

    //Navigates the User back to the ShoppingListPage
    this.navCtrl.pop();
  }

}
