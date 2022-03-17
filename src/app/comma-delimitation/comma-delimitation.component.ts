import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {Clipboard} from '@angular/cdk/clipboard';
import { commaDelimatedService } from 'src/app/shared/comma-delimitation.service';

@Component({
  selector: 'app-comma-delimitation',
  templateUrl: './comma-delimitation.component.html',
  styleUrls: ['./comma-delimitation.component.css']
})

export class CommaDelimitationComponent implements OnInit {


  radioForm!: FormGroup;

  // form created to prevent infinite loop on subscribed observable
  inputForm!: FormGroup;

  // form created to prevent infinite loop on subscribed observable
  outputForm!: FormGroup;

  constructor(
    private clipboard: Clipboard,
    private commaDelimatedService: commaDelimatedService,
    private fb: FormBuilder,
    ) {this.commaDelimatedService.updateService.subscribe()
      };

  ngOnInit(): void {
     // declaring forms on init
     this.inputForm = new FormGroup({
      'input': new FormControl(this.commaDelimatedService.inputForm, Validators.required),
    });
    this.radioForm = new FormGroup({
      'quotes': new FormControl(this.commaDelimatedService.radioForm),
    });
    this.outputForm = new FormGroup({
      'output': new FormControl(this.commaDelimatedService.outputForm)
    });

    // subsscribing to input obseravable
    this.inputForm.valueChanges.subscribe(
      // checking if quotes radio is checked
      (value) => {
        // emits update of input to service
        this.commaDelimatedService.inputForm = value.input;
        this.commaDelimatedService.updateService.emit();
        this.commaDelimatedService.commaDelimate();
        // update output
        this.outputForm.patchValue({
          'output': this.commaDelimatedService.outputForm
        });
      }
    );


    // subscribing to radio form changes
    this.radioForm.valueChanges.subscribe(
      // checks raido button option
      (value) =>{
        // update service
        this.commaDelimatedService.radioForm = value.quotes
        // emits update of input to service
        this.commaDelimatedService.updateService.emit();
        this.commaDelimatedService.commaDelimate();
        this.outputForm.patchValue({
          'output': this.commaDelimatedService.outputForm
        });
      }
    );
  };


  // copy output selected
  copyOutput() {
    // begins copying
    const pending = this.clipboard.beginCopy(this.commaDelimatedService.outputForm);
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
    this.commaDelimatedService.inputForm = '';
    this.commaDelimatedService.outputForm = '';
    this.commaDelimatedService.radioForm = 'Without Quotes'
    this.commaDelimatedService.updateService.emit();

    // patch input form
    this.inputForm.patchValue({
      'input': this.commaDelimatedService.inputForm
    });
    // patch output form
    this.outputForm.patchValue({
      'output': this.commaDelimatedService.outputForm
    });
    // patch radio form
    this.radioForm.patchValue({
      'quotes': this.commaDelimatedService.radioForm
    });
  };

};