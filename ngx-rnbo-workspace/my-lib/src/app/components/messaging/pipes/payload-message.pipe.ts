import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'payloadNum',
  standalone: true
})
export class PayloadMessagePipe implements PipeTransform {
  transform(value: number[]): string {
    return value.join(' ');
  }
}
@Pipe({
  name: 'payloadStr',
  standalone: true
})
export class PayloadDisplayPipe implements PipeTransform {
  transform(value: string|null): number[] {
    return value?.split(' ').map(el=>+el).filter(el => isNaN(el))??[]
  }
}