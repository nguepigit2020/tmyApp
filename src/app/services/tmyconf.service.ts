import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';

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
    (this as any).notify({
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
    return this.http.post<any[]>(this.baseUrl+"create/configuration", data, this.httpOptions);
  }
  
  
  upDateTmyConf(editForm: any){
    console.log(editForm.value.id)
    return this.http.post<any[]>(this.baseUrl+"update/configuration/"+editForm.value.id, editForm, this.httpOptions);
  }

  downloadTmyConf(id:any){
    return this.http.get<any>(this.baseUrl+"download_yaml/configuration/"+id, this.httpOptions)
  }
  
  
  deleteTmyConf(id:any){
    return this.http.delete<any[]>(this.baseUrl+"delete/configuration/"+id, this.httpOptions);
  
  }  

}
