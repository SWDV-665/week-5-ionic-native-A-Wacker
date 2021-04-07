import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { GroceriesServiceProvider } from '../../providers/groceries-service/groceries-service';
import { InputDialogServiceProvider } from '../../providers/input-dialog-service/input-dialog-service';
import { SocialSharing } from '@ionic-native/social-sharing';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  title = "Grocery";
  
  constructor(public navCtrl: NavController, public toastCtrl: ToastController, public alertCtrl: AlertController, public dataService: GroceriesServiceProvider, public inputDialogService: InputDialogServiceProvider, public socialSharing: SocialSharing) {

  }

loadItems() {
  return this.dataService.getItems();
}

addItem() {
  this.inputDialogService.showPrompt();
}

editItem(item, index) {
  const toast = this.toastCtrl.create({
    message: "Editing " + item.name,
    duration: 3000
  });

  toast.present();

  this.inputDialogService.showPrompt(item, index);
}

shareItem(item) {
  const toast = this.toastCtrl.create({
    message: "Sharing " + item.name,
    duration: 3000
  });

  toast.present();

  let msg = "Grocery Item - Name: " + item.name + " - Quantity: " + item.quantity;
  let subject = "Shared via Groceries app";
  this.socialSharing.share(msg, subject).then(() => {
    console.log("Sharing item ", item.name);
  }).catch((error) => {
    console.error("Error while sharing", error);
  });
}

removeItem(item, index) {
  const toast = this.toastCtrl.create({
    message: "Removing " + item.name,
    duration: 3000
  });
  
  toast.present();

  this.dataService.removeItem(index);
}

}