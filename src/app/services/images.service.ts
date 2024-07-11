import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { envirounments } from '../../environments/environments'; 
import { Produtos } from '../models/Produtos';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  private apiUrl = `${envirounments.Apiurl}/api/Produtos`;

  constructor(private http: HttpClient) { }

  getImages() {
      const url = this.apiUrl + "/BuscarProdutos";
      return this.http.get<Produtos[]>(url);
  }
}
