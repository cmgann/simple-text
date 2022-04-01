import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {Clipboard} from '@angular/cdk/clipboard';
import { textReplaceService } from '../shared/text-replace.service'; 
import { LocalStorageService } from '../shared/local-storage.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-text-replace',
  templateUrl: './text-replace.component.html',
  styleUrls: ['./text-replace.component.css']
})
export class TextReplaceComponent implements OnInit {

  // used for saving title
  title!: string;

  // used to check for saved pattern changes
  public patternIndex: number = -1


  // delcare form groups
  dataForm!: FormGroup;
  patternForm!: FormGroup;
  separatorForm!: FormGroup;
  resultsForm!: FormGroup;

  constructor(
    private clipboard: Clipboard,
    private textReplaceService: textReplaceService,
    public localStorageService: LocalStorageService,
    public dialog: MatDialog,
  ) { this.textReplaceService.updateService.subscribe(),
      this.localStorageService.updateService.subscribe()
     };

  ngOnInit(): void {
      // form group data
      this.dataForm = new FormGroup({
        'data':   new FormControl(this.textReplaceService.dataForm, Validators.required),
      }),
      this.patternForm = new FormGroup({
        'pattern': new FormControl(this.textReplaceService.patternForm, Validators.required),
      }),
      this.separatorForm = new FormGroup({
        'column':  new FormControl(this.textReplaceService.separatorFormColumn, Validators.required),
        'row':     new FormControl(this.textReplaceService.separatorFormRow, Validators.required),
        'dropDown': new FormControl(this.localStorageService.keys)
      }),
      this.resultsForm = new FormGroup({
        'results': new FormControl(this.textReplaceService.resultsForm, Validators.required),
      }),
  
      this.dataForm.valueChanges.subscribe(
        (value) => {
          // update service variable
          this.textReplaceService.dataForm = value.data;
          this.textReplaceService.updateService.emit();
          this.textReplaceService.results();
          // patch results form
          this.resultsForm.patchValue({
            'results': this.textReplaceService.resultsForm
            });
        }
      )
  
      this.separatorForm.valueChanges.subscribe(
        (value) => {
          // update service variable
          this.textReplaceService.separatorFormRow = value.row;
          this.textReplaceService.separatorFormColumn = value.column;
          this.textReplaceService.updateService.emit();
          this.textReplaceService.results();
          // patch results form
          this.resultsForm.patchValue({
            'results': this.textReplaceService.resultsForm
            });

            if (this.patternChange(value.dropDown) == true){
              let pattern = this.localStorageService.get(this.localStorageService.keys[value.dropDown]);
              pattern = this.textReplaceService.trimSelectedPattern(pattern)
              this.patternForm.patchValue({
                'pattern': pattern
              })
              this.title = this.localStorageService.keys[value.dropDown]
            }
          
        }
      )
  
      this.patternForm.valueChanges.subscribe(
        (value) => {
          //update service variable
          this.textReplaceService.patternForm = value.pattern;
          this.textReplaceService.updateService.emit();
          this.textReplaceService.results();
          // patch results form
          this.resultsForm.patchValue({
            'results': this.textReplaceService.resultsForm
            });
        }
      );
      
  };

  // copy output selected
  copyOutput() {
    // begins copying
    const pending = this.clipboard.beginCopy(this.resultsForm.value.results);
    // set 3 attempts for timeout
    let remainingAttempts = 3;
    const attempt = () => {
      const result = pending.copy();
      if (!result && --remainingAttempts) {
        setTimeout(attempt);
      } 
      else {
        // destroy's beginCopy
        pending.destroy();
      }
    };
    attempt();
  };

  clearForms() {
    this.textReplaceService.dataForm = undefined;
    this.textReplaceService.patternForm = undefined;
    this.textReplaceService.resultsForm = undefined;
    this.textReplaceService.separatorFormColumn = ',';
    this.textReplaceService.separatorFormRow = '\\n';
    this.textReplaceService.updateService.emit();
    // patch data form
    this.dataForm.patchValue({
      'data': this.textReplaceService.dataForm
    });
    // patch pattern form
    this.patternForm.patchValue({
      'pattern': this.textReplaceService.patternForm
    });
    // patch results form
    this.resultsForm.patchValue({
      'results': this.textReplaceService.resultsForm
    });
          // patch results form
    this.resultsForm.patchValue({
      'results': this.textReplaceService.resultsForm
    });
      // patch results form
    this.separatorForm.patchValue({
    'column': this.textReplaceService.separatorFormColumn,
    'row': this.textReplaceService.separatorFormRow,
    'dropDown': -1
    });
  };


// pattern Menu

  deletePattern() {
    let index = this.separatorForm.value['dropDown']
    let title = this.localStorageService.keys[index]
    this.localStorageService.remove(title)
    this.separatorForm.patchValue({
      'dropDown': this.localStorageService.keys
    })
  };

  patternChange(index: number): boolean {
    if (index != this.patternIndex) {
      this.patternIndex = index;
      // might need to update to return false if index == -1 to not delete the pattern if removing the selected value
      return true
    }else{
      return false
    }

  }

  // Material dialog

  openDialog(): void {
    const dialogRef = this.dialog.open(PatternDialog, {
      width: '250px',
      data: {title: this.title}
    });


    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined) {
        this.localStorageService.set(result, this.patternForm.value.pattern)
        this.separatorForm.patchValue({
          'dropDown': this.localStorageService.keys.indexOf(result)
        })
      } else{}
    });
  }
};





// Material dialog

export interface DialogData {
  title: string;
}

@Component({
  selector: 'pattern-dialog',
  templateUrl: 'pattern-dialog.html',
})
export class PatternDialog {
  constructor(
    public dialogRef: MatDialogRef<PatternDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  ngOnInit(): void {
    //this.data.title = 'test'
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
