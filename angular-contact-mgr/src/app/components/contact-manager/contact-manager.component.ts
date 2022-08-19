import { Component, OnInit } from '@angular/core';
import { IContact } from 'src/app/model/iContact';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-contact-manager',
  templateUrl: './contact-manager.component.html',
  styleUrls: ['./contact-manager.component.css']
})
export class ContactManagerComponent implements OnInit {

  loading:boolean=false;
  contacts:IContact[]=[];
  errorMessage:string | null =null;
  // contactId:string | null =null;

  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    this.getAllcontactFromServer();
  }

  getAllcontactFromServer(){
    this.loading=true;
    this.contactService.getAllContact().subscribe((data:IContact[])=>{
      this.contacts=data;
      // console.log(data);
      this.loading=false;
    },(error)=>{
      this.errorMessage=error;
      this.loading=false
    })
  }

  deleteContact(contactId:string | undefined){
    if(contactId){
      this.contactService.deleteContact(contactId).subscribe((data)=>{
        this.getAllcontactFromServer();
      },(error)=>{
        this.errorMessage=error;
        this.loading=false
      })
    }
  }
}
