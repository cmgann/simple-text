import { EventEmitter, Injectable } from "@angular/core";

@Injectable()
export class commaDelimatedService {
    updateService = new EventEmitter<string>();

    inputForm: string = '';
    radioForm: string = 'Without Quotes';
    outputForm: string = '';

    outputWithoutQuotes() {
        // check if input is undefined
        if (this.inputForm == '') {
            this.inputForm = '';
            this.outputForm = '';
        }else{
            // comma delimate input
            this.outputForm = this.inputForm.replace(/\n/gi, ",");
        };

        // fix for issue #1
        // remove trailing commas
        let outputLength = this.outputForm.length

        do{
            if (this.outputForm[outputLength - 1] == ',') {
                this.outputForm = this.outputForm.slice(0 , +outputLength -1)
                outputLength = this.outputForm.length
            }else{};
        }
        while(
            this.outputForm[outputLength - 1] == ','
        );
    };

    outputWithQuotes() {
        // check if input is undefined
        if (this.inputForm == undefined || this.inputForm == '') {
            this.inputForm = '';
            this.outputForm = '';
        }else{
            // comma delimate input
            this.outputForm = ("'" + this.inputForm.replace(/\n/gi, "','") + "'");
        };

        // fix for issue #1
        // remove trailing commas and quotes
        let outputLength = this.outputForm.length

        do{
            if (this.outputForm[outputLength - 3] == ',') {
                this.outputForm = this.outputForm.slice(0 , +outputLength -3)
                outputLength = this.outputForm.length
            }else{};

        }
        while(
            this.outputForm[outputLength - 3] == ','
        );
    };

    commaDelimate() {
        
        //console.log(this.inputForm)
        if (this.radioForm == 'Without Quotes') {
          // run comma delimate without quotes
          this.outputWithoutQuotes();
          // patch output form
        }
        // else quotes radio is checked
        else {
          // run comma delimate with single quotes
          this.outputWithQuotes();
          // patch output form
        };
      };

};