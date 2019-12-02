import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], searchText: string): any[] {
    if(!items) return [];
    if(!searchText) return items;
    console.log("ssearchText ==>" , searchText);
    searchText = searchText.toLowerCase();
    console.log(items , searchText);
    return items.filter( it => {
    	console.log(it);
      if(it.user)
    	  return it.user[0].name.toLowerCase().includes(searchText);
      else
        return it.name.toLowerCase().includes(searchText);
    });


  }

}
