import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { IContact } from 'src/app/model/iContact';
import { IGroup } from 'src/app/model/iGroup';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent implements OnInit {

  loading:boolean=false;
  contactId:string | null= null;
  contact:IContact ={} as IContact;
  errorMessage:string|null=null;
  groups:IGroup[]=[] as IGroup[];
  
  constructor(private activatedRoute: ActivatedRoute,
              private contactService:ContactService,
              private router:Router
      ) { }

  ngOnInit(): void {
    this.loading=true;
    this.activatedRoute.paramMap.subscribe((param:ParamMap)=>{
      this.contactId=param.get('contactId');
    });
    if(this.contactId){
      this.contactService.getContact(this.contactId).subscribe((data)=>{
        this.contact=data;
        this.loading=false;
        this.contactService.getAllGroup().subscribe((data)=>{
          this.groups=data;});
      },(error)=>{
        this.errorMessage=error;
        this.loading=false;
      }
      );
    }
    
  }

  submitUpdate(){
    if(this.contactId){
      this.contactService.updateContact(this.contact, this.contactId).subscribe((data)=>{
        this.router.navigate(['/']).then();
      },(error)=>{
        this.errorMessage=error;
        this.router.navigate([`/contacts/edit/${this.contactId}`]).then();
      });
    }
  }
}
