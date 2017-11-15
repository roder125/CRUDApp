import { DatabaseService } from './../services/database/database.service';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { ShoppingListPage } from '../pages/shopping-list/shopping-list';
import { AddShoppingPage } from '../pages/add-shopping/add-shopping';

// imports Firebase config from FIREBASE_CREDENTIALS file 
import { FIREBASE_CREDENTIALS } from "./firebase.credentials";

// import the AF2 Module
import { AngularFireModule} from "angularfire2";
import { AngularFireDatabaseModule } from 'angularfire2/database';
 

@NgModule({
  declarations: [
    MyApp,
    ShoppingListPage,
    AddShoppingPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    // add AF Module to NgModule imports 
    AngularFireModule.initializeApp(FIREBASE_CREDENTIALS),
    // import AngularFireDatabaseModule to use database interactions
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ShoppingListPage,
    AddShoppingPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DatabaseService
  ]
})
export class AppModule {}
