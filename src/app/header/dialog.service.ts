import { Injectable } from '@angular/core';
import { Component } from '@angular/core';
import { MatDialog, MatDialogModule, MatDialogContent } from '@angular/material/dialog';


@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(
    public dialog: MatDialog
  ) { };

  openDialog(url: string) {
    // comma delimited dialog
    if ( url == '/comma') {
      this.dialog.open(CommaDelimitedDialog);
    } 
    // text replace dialog
    else if ( url == '/text-replace' ) {
      this.dialog.open(TextReplaceDialog);
    }
  };

  

};


@Component({
  selector: 'comma-delimited',
  templateUrl: 'comma-delimited-dialog.html',
})
export class CommaDelimitedDialog {}


@Component({
  selector: 'text-replace',
  templateUrl: 'text-replace-dialog.html',
})
export class TextReplaceDialog {

  constructor(
    public dialog: MatDialog
  ) { };
}