import { DatabaseService } from './../../services/database/database.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AddShoppingPage } from '../add-shopping/add-shopping';

import { AngularFireDatabase, AngularFireList, SnapshotAction  } from 'angularfire2/database';
import { ShoppingItem } from '../../models/shopping-item/shopping-item.interface';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';


@IonicPage()
@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {

  listRef$: Observable<SnapshotAction[]>;
  list: Observable<any[]>;
  items: string[];


  // Creating a new Opject, uses the Interface of a ShoppingItem
  shoppingItem = {} as ShoppingItem;

  constructor(public navCtrl: NavController, public navParams: NavParams, private dbService: DatabaseService) {
    
  }

  ionViewDidLoad(){
    this.showList();
  }

  navigateToAddShoppingPage(){
    //navigates the User to the AddShoppingPage
    this.navCtrl.push(AddShoppingPage);  
  }
  
  /**
   * Zeigt die Liste der Datenbank an, mit Hilfe des dbServices, in anderer Reihenfolge
   */
  showList(){
    this.listRef$ = this.dbService
    .getShoppingList()
    .snapshotChanges(["child_added","child_removed","child_changed"])
    .map(data => {
        return data.slice().reverse().map( c => ({
        key: c.payload.key, ... c.payload.val()
      }))
    })
  }

  /**
   * Speichert Daten in die Datenbank mit Hilfe des dbServices
   * @param name 
   * @param ammount 
   */
  addShoppingItem(name: string, ammount: number){
    if(name == "" || ammount == null ){
      console.log("Keine Eingabe getätigt");
      return;
    }
    else{
      ammount.toString()
      this.dbService.saveItem(name, ammount);
    }
  }
  
  /**
   * Löscht Item aus der Liste
   * @param itemKey 
   */
  deleteItem(itemKey: string){
    this.dbService.deleteItem(itemKey);
  }

}
