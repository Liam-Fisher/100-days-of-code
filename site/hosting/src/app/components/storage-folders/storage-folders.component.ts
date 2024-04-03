import { Component, inject } from '@angular/core';
import { FirebaseStorageService } from '../../services/firebase-storage.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-storage-folders',
  standalone: true,
  imports: [],
  templateUrl: './storage-folders.component.html',
  styleUrl: './storage-folders.component.scss'
})
export class StorageFoldersComponent {
  storage = inject(FirebaseStorageService);
  storageFolders = new BehaviorSubject<string[]>([]);
  activeFolder: string = '';
  storageFiles: string[] = [];
  activeFile: string = '';

  constructor() { }
  getStorageFolders() {
    this.storage.listStorageFolders(this.activeFolder).then((folders) => {
      this.storageFolders.next(folders);
    });
  }


}
