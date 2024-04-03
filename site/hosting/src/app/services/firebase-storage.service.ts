import { Injectable, inject } from '@angular/core';
import { Storage, ref, uploadBytes, listAll, getDownloadURL, getBlob, UploadResult } from '@angular/fire/storage';
import { environment as firebaseConfig } from '../../environments/environment.development';
@Injectable({
  providedIn: 'root'
})
export class FirebaseStorageService {
  readonly storage = inject(Storage); 
  readonly bucket: string = firebaseConfig.storageBucket; 
  constructor() { }

// Firebase Cloud Storage
async listStorageFolders(path: string): Promise<string[]> {
  const  results = await listAll(ref(this.storage, path));
  console.log('results', results);
  return results.prefixes.map((ref) => ref.name.split('.')[0]);
}
async listStorageFiles(path: string): Promise<string[]> {
  const  results = await listAll(ref(this.storage, path));
  return results.items.map((ref) => ref.name.split('.')[0]);
}
getRef(path: string) {
  return ref(this.storage, `${this.bucket}/${path}`);
}
async getURL(path: string) {
  return await getDownloadURL(ref(this.storage, path));
}
async loadBlob(path: string) {
  return getBlob(ref(this.storage, path));
}
async loadJSON(path: string) {
  return JSON.parse(await (await this.loadBlob(`${path}.json`)).text());
}
uploadFile(file: File, path: string): Promise<UploadResult> {
  const storageRef = ref(this.storage, path);
  return uploadBytes(storageRef, file);
  }
async createFile(blob: Blob, filename: string, filetype: string): Promise<File> {
    let ext = filetype.split('/')[1];
    let file = new File([blob], `${filename}.${ext}`, {
      type: filetype,
    });
    return file;
  }

}
