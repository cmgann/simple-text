import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  updateService = new EventEmitter<string>();

  keys: string[]= []
  pattern: string[]= []

  localStorage: Storage;

  constructor() { 
    this.localStorage = window.localStorage;
  }


  get(key: string): any {
    if (this.isLocalStorageSupported) {
      return this.localStorage.getItem(key)
    }
    return null;
  };
  
  set(key: string, value: any): boolean {
    if (this.isLocalStorageSupported) {
      this.localStorage.setItem(key, JSON.stringify(value));
      this.getAllKeys()
      this.getAllPattern()
      return true;
    }
    return false;
  };

  remove(key: string): boolean {
    if (this.isLocalStorageSupported) {
      this.localStorage.removeItem(key);
      this.getAllKeys()
      return true;
    }
    this.getAllKeys()
    return false;
  };

  get isLocalStorageSupported(): boolean {
    return !!this.localStorage
  };

  getAllPattern() {
    var values = [],
        keys = Object.keys(localStorage),
        i = keys.length;

    while ( i-- ) {
        values.push( localStorage.getItem(keys[i]) );
    }
    return values;
};

  getAllKeys(){
    var keys = Object.keys(this.localStorage)
    this.keys = keys
    return keys
  };

};

