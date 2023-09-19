import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import* as $ from 'jquery'
import 'bootstrap-notify'

@Injectable({
  providedIn: 'root'
})
export class TmyconfService {

  constructor(private http : HttpClient) { }
  httpOptions = {
    headers : new HttpHeaders({
      'Content-Type': 'application/json',
      //'Authorization': `Bearer ${this.auth.getToken()} `
    })
  }

  baseUrl = environment.apiUrl;

  //Cette methode permet d'afficher les notification quand l'utilisateur effectue une opération.
  showNotification(mess:string,_type:string){
    ($ as any).notify({
      icon: "add_alert",
      message: mess
      },{
      type: _type,
      timer: 2000,
      placement: {
      from: 'top',
      align: 'right'
      }
      });
    }

  getAllTmyConf():Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + "getall/configurations");
  }
  
  postTmyConf(data:any){
    return this.http.post<any>(this.baseUrl+"create/configuration", data, this.httpOptions);
  }
  
  
  upDateTmyConf(editForm: any){
    return this.http.post<any>(this.baseUrl+"update/configuration/"+editForm.id, editForm, this.httpOptions);
  }

  
  downloadFileTmyConf(id: number): Observable<Blob> {
    return this.http.get(this.baseUrl+"download_yaml/configuration/"+id, { responseType: 'blob' });
  }
  
  
  deleteTmyConf(id:any){
    return this.http.delete<any[]>(this.baseUrl+"delete/configuration/"+id, this.httpOptions);
  
  }  

}
