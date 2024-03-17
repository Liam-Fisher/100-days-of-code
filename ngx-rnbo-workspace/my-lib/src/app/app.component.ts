import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AudioControlPanelComponent } from './components/audio/audio-control-panel/audio-control-panel.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AudioControlPanelComponent],
  template: `
  <h1> my lib </h1>
  <ngx-audio-control-panel></ngx-audio-control-panel>
  `
})
export class AppComponent {
  title = 'my-lib';
constructor() { }

}
