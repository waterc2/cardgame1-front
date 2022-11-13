import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class publicFunctionService {
 getCardBorderColorFromRarity(rarity:number, format:string = 'HEX'){
  let colorHEX:number;
  switch(rarity){
    case -1: colorHEX = 0xededed;
    break;
    case 0: colorHEX = 0x939393;
    break;
    case 1: colorHEX = 0x2c2c2c;
    break;
    case 2: colorHEX = 0x1a4678;
    break;
    case 3: colorHEX = 0x6015bd;
    break;
    case 4: colorHEX = 0xb5601b;
    break;
    case 5: colorHEX = 0x7f072c;
    break;
  }
  return colorHEX;
 }
}
