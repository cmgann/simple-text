import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../shared/local-storage.service';
import { Router } from '@angular/router';
import { DialogService } from './dialog.service';
import { MatDialog, MatDialogModule, MatDialogContent } from '@angular/material/dialog';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  title!: string;
  url!: string;

  constructor(
    private localStorageService: LocalStorageService,
    private router: Router,
    private dialogService: DialogService,
  ) 
  { 
    router.events.subscribe((val) => {
      this.urlChange()
    });
  }

  ngOnInit(): void {
    this.getKeys();
    this.getPaterns();
  }

  urlChange() {
     this.url = this.router.url


    if ( this.url == '/') {
      this.title = 'Simple Text'
    } else if ( this.url == '/comma') {
      this.title = 'Comma Delimitation'
    } else if ( this.url == '/text-replace') {
      this.title = 'Text Replace'
    }

    
  }

  // local storage functions

  getKeys() {
    this.localStorageService.getAllKeys();
  };

  getPaterns() {
    this.localStorageService.getAllPattern();
  }

  openDialog() {
    this.dialogService.openDialog(this.url)
  }

}


