import { isGeneratedFile } from '@angular/compiler/src/aot/util';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Params } from '@angular/router';
import { IContact } from 'src/app/model/iContact';
import { IGroup } from 'src/app/model/iGroup';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-view-contact',
  templateUrl: './view-contact.component.html',
  styleUrls: ['./view-contact.component.css']
})
export class ViewContactComponent implements OnInit {

  loading:boolean=false;
  contactId: string | null =null;
  contact:IContact={} as IContact;
  errorMessage:string | null =null;
  group:IGroup={} as IGroup;

  constructor(private activatedRoute: ActivatedRoute,
              private contactService: ContactService
        ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((param:ParamMap)=>{
      this.contactId=param.get('contactId')
    });
    if(this.contactId){
      this.loading=true;
      this.contactService.getContact(this.contactId).subscribe((data:IContact)=>{
        this.contact=data;
        this.loading=false;
        this.contactService.getGroup(data).subscribe((data:IGroup)=>{
          this.group=data;});
      },(error)=>{
        this.errorMessage=error;
        this.loading=false;
      }
      )
    }
  }

  isNotEmpty(){
    return Object.keys(this.contact).length>0 && Object.keys(this.group).length>0
  }

}
