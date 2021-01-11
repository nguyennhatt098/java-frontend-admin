import { AppConsts } from './../../shared/AppConsts';
import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { Roles } from '../Role';
import { ValidationOption, RequiredValidationRule, ValidationRuleResponse, CustomValidationRule, ValidationService, ClientValidator, DataService } from 'ngx-fw4c';
import { of, Observable } from 'rxjs';
import { RoleService } from '../role.service';

@Component({
  selector: 'app-roles-edit',
  templateUrl: './roles-edit.component.html',
  styleUrls: ['./roles-edit.component.scss']
})
export class RolesEditComponent implements OnInit {
  @ViewChild('formRef', { static: true }) public formRef: ElementRef;
  @Input() item: Roles;
  private oldItem: Roles;
  constructor( private _validationService: ValidationService,
    private _roleService:RoleService,
    private _dataService: DataService) { }

  ngOnInit() {
    if (this.item.id) {
      this.oldItem =this._dataService.cloneItem(this.item);
    this.initValidations();
    }
  }
  private initValidations(): void {
    var options = [
      new ValidationOption({
        validationName: 'Name',
        dynamic: true,
        valueResolver: () => this.item.roleName,
        rules: [
          new RequiredValidationRule(() => AppConsts.RequiredError),
          new CustomValidationRule(value => {
            if (this.oldItem && this.oldItem.roleName == value) {
              return of(new ValidationRuleResponse({
                status: true,
              }))
            }
            return this._roleService.checkUniqueRoleName(value);
          }),
        ]
      }),
      new ValidationOption({
        validationName: 'Decription',
        valueResolver: () => this.item.description,
        dynamic: true,
        rules: [
          new RequiredValidationRule(() => AppConsts.RequiredError),
        ]
      }),
      
    ];
    var validator = new ClientValidator({
      formRef: this.formRef,
      options: options
    });

    this._validationService.init({ validator });
  }

  public getValidator(): ValidationService {
    return this._validationService;
  }

  public isValid(): boolean {
    return this._validationService.isValid(true, false);
  }

  public callback(): Observable<any> {
    return of(this.item);
  }
}
