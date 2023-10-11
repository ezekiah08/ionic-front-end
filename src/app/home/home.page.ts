import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  selectedService: any;
  serviceProvider: any;
  originalService: any;

  constructor(private router: Router,
              private http: HttpClient) {}

  ngOnInit(): void {
    const user =localStorage.getItem('User');

      if(user == null) {
        this.router.navigateByUrl('/login', {replaceUrl: true})
      }else {
        this.http.get('http://localhost:3000/Users/')
        .subscribe(res =>{
          this.serviceProvider = res;
          this.originalService = res
        },error => {
          console.log(error)
        })

      }
  }
  onServiceSelect(e) {

    this.serviceProvider = this.originalService;
    this.selectedService = e.detail.value;
    this.serviceProvider = this.serviceProvider.filter(serviceProv => {
      return serviceProv.service == this.selectedService;
    })
  }
}
