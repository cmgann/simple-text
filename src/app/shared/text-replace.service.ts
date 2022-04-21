import { EventEmitter, Injectable } from "@angular/core";

@Injectable()
export class textReplaceService {

    // data form vars
    dataForm: any;
    // pattern form
    patternForm: any;
    //separator form vars
    separatorFormColumn: string = ',';
    separatorFormRow: string = '\\n';
    // result form vars
    resultsForm: any;

    updateService = new EventEmitter<string>();

    // build results
    results() {
        // separate rows
        let rows = this.separateRows();

        if (rows == undefined){
        }else{
            this.formatRows(rows);
        };
    };


    separateRows() {
        // turn Row separator into RegEx
        var re = new RegExp(this.separatorFormRow, 'g');
        // split data at row separator
        if (this.dataForm == undefined){
        }else{
            var rows = this.dataForm.split(re);
            return rows;
        };
    };

    // this is the final piece that updates the results form
    formatRows(rows: any) {
        // clears results form to no duplicate
        this.resultsForm = undefined

        // turn Column separator into RegEx
        var re = new RegExp(this.separatorFormColumn, 'g')

        for (let row of rows){
            var column = row.split(re);
            let columnResult = this.printColumnResult(column);
            if (this.resultsForm == undefined) {
                this.resultsForm = columnResult;
            }else {
                this.resultsForm = this.resultsForm + '\n' + columnResult;
            };
        };
        try{
            var re = new RegExp('undefined', 'g')
            this.resultsForm = this.resultsForm.replace(re, '')
        }
        catch(error) {
        };
    };

    printColumnResult(column: any) {
        let tempString = this.patternForm;

        // prevent undefined an '' columns
        // from creting additional patter lines
        // in results
        if (column == undefined || column == '') {
        }else{
            for (let item of column) {
                // turn item into regex
                var value = '[$]' + column.indexOf(item) + ''
                var re = new RegExp(value, 'gi');

                if (tempString == undefined){
                    continue;
                }else{
                    tempString = tempString.replace(re, item);
                }
            };
            return tempString
        };
    };

    trimSelectedPattern(pattern:string) {
        try{
        pattern = pattern.slice(1,-1)
        var re = new RegExp( /\\n/ , 'gi');
        var re2 = new RegExp(/\\t/, 'gi');
        pattern = pattern.replace(re, '\n')
        pattern = pattern.replace(re2, '\t')

        return pattern
        }
        catch{
            return
        }
    }

};