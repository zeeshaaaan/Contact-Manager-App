import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { CATCH_ERROR_VAR } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { IContact } from '../model/iContact';
import { IGroup } from '../model/iGroup';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  serverUrl:string="http://localhost:9000";

  constructor(private httpClient: HttpClient) { }

  //Get All Contacts:

  getAllContact():Observable<IContact[]> {
    let dataUrl:string=`${this.serverUrl}/contacts`;
    // let dataUrl:string="http://localhost:9000/contacts";
    return this.httpClient.get<IContact[]>(dataUrl);
  }

  //Get Single Contact:

  getContact(contactId:string):Observable<IContact> {
    let dataUrl:string=`${this.serverUrl}/contacts/${contactId}`;
    return this.httpClient.get<IContact>(dataUrl);
  }

  //Create a Contact:

  createContact(contact: IContact):Observable<IContact> {
    let dataUrl:string=`${this.serverUrl}/contacts`;
    return this.httpClient.post<IContact>(dataUrl,contact);
  }

  //Update Contact:

  updateContact(contact: IContact, contactId:string):Observable<IContact> {
    let dataUrl:string=`${this.serverUrl}/contacts/${contactId}`;
    return this.httpClient.put<IContact>(dataUrl,contact);
  }

  //Delete a Contact:

  deleteContact(contactId:string):Observable<{}> {
    let dataUrl:string=`${this.serverUrl}/contacts/${contactId}`;
    return this.httpClient.delete<{}>(dataUrl);
  }

  //Get All Group:

  getAllGroup():Observable<IGroup[]> {
    let dataUrl:string=`${this.serverUrl}/groups`;
    return this.httpClient.get<IGroup[]>(dataUrl);
  }

  //Create a group:

  getGroup(contact: IContact):Observable<IGroup> {
    let dataUrl:string=`${this.serverUrl}/groups/${contact.groupId}`;
    return this.httpClient.get<IGroup>(dataUrl);
  }


  //Error Handling:

  handleError(error: HttpErrorResponse){
    let errorMessage="";
    if(error.error instanceof ErrorEvent){
    errorMessage=`Error : ${error.error.message}`
    }
    else{
      errorMessage=`Status : ${error.status} \n Message: ${error.message}`
    }
    return throwError(errorMessage);
  }
  
}


