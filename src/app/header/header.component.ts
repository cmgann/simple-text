import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../shared/local-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private localStorageService: LocalStorageService
  ) { }

  ngOnInit(): void {
    this.getKeys();
    this.getPaterns();
  }

  getKeys() {
    this.localStorageService.getAllKeys();
  };

  getPaterns() {
    this.localStorageService.getAllPattern();
  }

}
