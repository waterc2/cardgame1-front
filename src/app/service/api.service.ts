import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public baseUrl = "http://127.0.0.1";
  private u_id: number | undefined;

  constructor(private httpClient: HttpClient) {
    let returnUrl = localStorage.getItem('loggedInUser');
    if (returnUrl) {
      this.u_id = JSON.parse(returnUrl).user.u_id;
    }
  }
  
  getStage$()
  {
    return this.httpClient.get<any>(`${this.baseUrl}/api/getStage`);
  }

  //
  changeGameStage$()
  {
    return this.httpClient.post<any>(`${this.baseUrl}/api/changeStage`, 'stage=startGame');
  }
  
  getAvailablePackageNumber$()
  {
    return this.httpClient.get<any>(`${this.baseUrl}/api/availablePackageNumber`);
  }

  getAvailablePackage$()
  {
    return this.httpClient.get<any>(`${this.baseUrl}/api/availablePackage`);
  }

  getStartANewGame$()
  {
    return this.httpClient.get<any>(`${this.baseUrl}/api/resetGame`);
  }

  getAllMyCards$()
  {
    return this.httpClient.get<any>(`${this.baseUrl}/api/getAllMyCards`);
  }

  getAllHandCards$()
  {
    return this.httpClient.get<any>(`${this.baseUrl}/api/getAllHandCards`);
  }

  postOpenPackage$(p_id:number)
  {
    let reqData = { "p_id": p_id};
    return this.httpClient.post<any>(`${this.baseUrl}/api/openPackage`, reqData);    
  }

  postPutCardToHand$(c_id:number)
  {
    let reqData = { "c_id": c_id};
    return this.httpClient.post<any>(`${this.baseUrl}/api/putCardToHand`, reqData);    
  }

  getMapData$()
  {
    return this.httpClient.get<any>(`${this.baseUrl}/api/getMapData`);
  }


}
