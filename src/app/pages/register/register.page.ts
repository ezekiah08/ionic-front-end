import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
;

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isServiceProvider: Boolean = false;
  service: string = 'none';
  pic: string;
  bio: string;
  isLoading: boolean = false

  constructor(private http: HttpClient,
              private alertController: AlertController,
              private router: Router ) { }

  ngOnInit() {
  }
  onServiceSelect(e) {
    var responsed = e.detail.value;
      if(responsed == 'no') {
        this.isServiceProvider = false
      }else {
        this.isServiceProvider = true
      }
  }

  register() {
    this.isLoading = true
    let user = {
     email: this.email,
     password: this.password,
     firstName: this.firstName,
     lastName: this.lastName,
     isServiceProvider: this.isServiceProvider,
     service: this.service,
     bio: this.bio,
     pic: this.pic
    }

    this.http.post('http://localhost:3000/Users/register', user)
    .subscribe(res => {
      this.isLoading = false
      localStorage.setItem('User', JSON.stringify(res));
      this.router.navigateByUrl('', { replaceUrl: true});
    }, error => {
      this.isLoading = false
      this.presentAlert('Register Failed', error.error.error)
    })
  }

  async presentAlert(header: string,message: string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: header,
      message: message,
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
  }

}
