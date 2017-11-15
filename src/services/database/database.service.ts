
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Injectable } from '@angular/core';

@Injectable()
export class DatabaseService{

    constructor(private db : AngularFireDatabase){}

    private listRef$ = this.db.list('shopping-list');

    /**
     * Liefert Liste aus der Datenbank
     */
    getShoppingList(){
        return this.listRef$;
    }

    /**
     * Löscht ein Item in der Datenbank mit dem key
     * @param key 
     */
    deleteItem(key){
        return this.listRef$.remove(key);
    }

    /**
     * speichert ein Item in der Datenbank
     * @param itemName 
     * @param itemNumber 
     */
    saveItem(itemName, itemNumber){
        return this.listRef$.push({itemName, itemNumber});
    }
}