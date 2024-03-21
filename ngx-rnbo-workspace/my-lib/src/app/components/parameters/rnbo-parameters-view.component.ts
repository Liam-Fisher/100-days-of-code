import { Component, inject } from '@angular/core';
import { ParameterContainerComponent } from './parameter-container.component';
import { RnboParametersService } from '../../services/parameters/rnbo-parameters.service';

@Component({
  selector: 'ngx-rnbo-parameters-view',
  standalone: true,
  imports: [ParameterContainerComponent],
  template: `  
  @for(addr of params.addresses(); track $index) {
      <ngx-parameter-container 
      #container 
      [param]="params.byId(addr.id)" 
      [displayName]="params.displayNameLabel(addr)"
      ></ngx-parameter-container>
  }
  `,
  styles: ``
})
export class RnboParametersViewComponent {
  params = inject(RnboParametersService);
}
