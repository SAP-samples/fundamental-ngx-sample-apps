import { Pipe, PipeTransform,OnDestroy } from '@angular/core';
import { Product } from '../models/product.model';

@Pipe({
  name: 'filterDataByName',
  pure: false
})
export class FilterDataByNamePipe implements PipeTransform {
  // ngOnDestroy(): void {
  //   if (isPresent(this._subscription)) {
  //     this._dispose();
  //   }  
  // }

  transform(oldData: Product[], selectedData: Product[]): Product[] {

    // console.log('reload');
    if (selectedData.length === 0) {
      selectedData = oldData;
      }

    return selectedData;
  }

}
