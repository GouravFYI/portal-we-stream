import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { VisibilityService } from './app.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  visibleNav:boolean = false

  constructor(private visibilityService: VisibilityService) { }
  @ViewChild('navbarToggler') navbarToggler!: ElementRef;
  @ViewChild('navbarTogglerList') navbarTogglerList!: ElementRef;

  ngOnInit(): void {
    this.visibilityService.visibleNav$.subscribe((value) => {
      this.visibleNav = value;
    });
  }

  checkAuth(){
    const path = location.pathname
    if (path !== '/login') {
      this.visibleNav = true
    }else {
      this.visibleNav = false
    }
  }

  toggleNav() {
    const buttonElement: HTMLButtonElement = this.navbarToggler.nativeElement;
    const listElement: HTMLDivElement = this.navbarTogglerList.nativeElement;
    buttonElement.setAttribute('aria-expanded', 'false');
    buttonElement.classList.add('collapsed');
    listElement.classList.remove('show');
  }

}
