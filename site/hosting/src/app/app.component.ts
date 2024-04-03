import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StorageFoldersComponent } from './components/storage-folders/storage-folders.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, StorageFoldersComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'doc-100';
}
