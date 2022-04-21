import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public innerWidth: any;
  cols!: number;

  constructor() { }

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
    this.changeMatGrid()
  }

  @HostListener('window:resize', ['$vent'])
  onResize(event: any) {
    this.innerWidth = window.innerWidth
    this.changeMatGrid()
  }

  changeMatGrid(){
    if(this.innerWidth < 755) {
      this.cols = 1
    }
    else {
      this.cols = 2
    }
  }

}
