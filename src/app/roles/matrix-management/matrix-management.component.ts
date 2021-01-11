import { AuthenticationServices } from './../../helpers/authentication.service';
import { SearchRequest } from './../../shared/search-request';
import { ActionResponse } from './../../shared/action-response';
import { AppConsts } from './../../shared/AppConsts';
import { Actions } from './../Actions';
import { RoleService } from './../role.service';
import { AppIcons } from './../../shared/AppConsts';
import { Component, OnInit, ViewChild, Input, TemplateRef } from '@angular/core';
import { TableComponent, TableOption, ModalService, TableColumnType, TableMode, ConfirmViewModel, TableConstant, TableMessage, TableText } from 'ngx-fw4c';
import { Roles } from '../Role';
import { map } from 'rxjs/operators';
import { RoleActions } from '../RoleActions';
import { ToastrService } from 'ngx-toastr';
const removeElements = (elms) => elms.forEach(el => el.remove());

@Component({
  selector: 'app-matrix-management',
  templateUrl: './matrix-management.component.html',
  styleUrls: ['./matrix-management.component.scss']
})
export class MatrixManagementComponent implements OnInit {
  @ViewChild('tableRole', { static: true }) tableRole: TableComponent;
  @ViewChild('tablePermission', { static: true }) tablePermission: TableComponent;
  @ViewChild("tablePermission", { static: true }) public list: TemplateRef<any>;
  @Input() item: Roles;
  public RoleOp: TableOption;
  public PermissionOp: TableOption;
  private SelectedRoles: RoleActions[] = [];
  private SelectedPermission: RoleActions[] = [];
  constructor(private _authenticationService: AuthenticationServices,
    private _modalService: ModalService,
    private _toastr: ToastrService,
    private _roleService: RoleService,) { }

  ngOnInit() {
    this.initList();
    setTimeout(function () {

      removeElements(document.querySelectorAll(".m-0.ng-star-inserted"));
    }, 200);
  }
  private initList(): void {
    var tableText = new TableText();
    tableText.action = 'Action';
    tableText.advancedSearchTitle = 'Search advance';
    tableText.placeholderSearch = 'Enter search keywords';
    tableText.allTitle = 'All';
    tableText.advancedBtnCancelTitle = 'cancel';
    tableText.filterTitle = 'Search By'
    tableText.advancedBtnTitle = 'search';
    tableText.selectPageSize = 'Display';
    var tableMessage = new TableMessage();
    tableMessage.loadingMessage = 'Loading',
      tableMessage.notFoundMessage = 'No data found';
    this.RoleOp = new TableOption({
      title: 'Selected Role ' + this.item.roleName,
      paging: true,
      localData: () => {
        var actionsList = [];
        return this._roleService.getActionByRole(this.item.id).pipe(map(val => {
          for (let index = 0; index < val.length; index++) {
            let actions = new Actions();
            actions.id = val[index][0];
            actions.actionName = val[index][1];
            actions.description = val[index][2];
            actionsList.push(actions);
          }
          return actionsList;
        }));
      },
      selectedChange: (item) => {
        if (this.SelectedRoles.find(x => x.actionId.id == item.id)) {
          this.SelectedRoles = this.SelectedRoles.filter(x => x.actionId.id != item.id);
        } else {
          this.SelectedRoles.push(new RoleActions({ actionId: new Actions({ id: item.id, actionName: item.actionName }), roleId: new Roles({ id: this.item.id }) }));
        }
      },
      displayText: tableText,
      message: tableMessage,
      inlineEdit: false,
      mode: TableMode.full,
      searchFields: ['actionName', 'description'],
      actions: [
        {
          type: TableConstant.ActionType.Toolbar,
          icon: AppIcons.Remove,
          title: () => 'Delete',
          customClass: 'danger',
          hide: () => {
            return !this._authenticationService.checkAuthenticate('DELETE ROLE ACTIONS');
          },
          executeAsync: () => {
            this._modalService.showConfirmDialog(new ConfirmViewModel({
              title: AppConsts.Confirm,
              message: AppConsts.ConfirmDelete,
              acceptCallback: () => {
                this._roleService.deleteMutipleAction(this.SelectedRoles).subscribe((val: ActionResponse<Roles>) => {
                  if (val.failureItems.length == 0) {
                    // this.tableList.reload();
                    this._toastr.success('Changes saved', 'Success');
                  } else {
                    // this.tableList.reload();
                    this._toastr.success(`Total fail ${val.failureItems}\n ToTal succes:${val.successItems}`, 'Success');
                  }
                });
                removeElements(document.querySelectorAll(".modal"));
                removeElements(document.querySelectorAll(".modal-backdrop"));
              }
            }))
          }
        },
      ],
      mainColumns: [
        {
          type: TableColumnType.Description,
          title: () => 'Name',
          valueRef: () => 'actionName',
          allowFilter: true
        },
        {
          type: TableColumnType.Description,
          title: () => 'Decription',
          allowFilter: true,
          valueRef: () => 'description',
        },
      ],
    });


    this.PermissionOp = new TableOption({
      title: 'List Roles',

      localData: () => {
        var actionsList = [];
        return this._roleService.getActionByRoleAction(new SearchRequest({ id: this.item.id })).pipe(map(val => {
          for (let index = 0; index < val.length; index++) {
            let actions = new Actions();
            actions.id = val[index][0];
            actions.actionName = val[index][1];
            actions.description = val[index][2];
            actionsList.push(actions);
          }
          return actionsList;
        }));
      },
      selectedChange: (item) => {
        if (this.SelectedPermission.find(x => x.actionId.id == item.id)) {
          this.SelectedPermission = this.SelectedPermission.filter(x => x.actionId.id != item.id);
        } else {
          this.SelectedPermission.push(new RoleActions({ actionId: new Actions({ id: item.id, actionName: item.actionName }), roleId: new Roles({ id: this.item.id }) }));
        }
      },
      actions: [
        {
          type: TableConstant.ActionType.Toolbar,
          icon: AppIcons.Add,
          title: () => 'Add Permission',
          customClass: 'primary',
          hide: () => {
            return !this._authenticationService.checkAuthenticate('ADD ROLE ACTIONS');
          },
          executeAsync: () => {
            this._modalService.showConfirmDialog(new ConfirmViewModel({
              title: AppConsts.Confirm,
              message: AppConsts.ConfirmSave,
              acceptCallback: () => {
                this._roleService.addMutipleAction(this.SelectedPermission).subscribe((val: ActionResponse<RoleActions>) => {
                  if (val.failureItems.length == 0) {
                    this._toastr.success('Changes saved', 'Success');
                  } else {
                    this._toastr.success(`Total fail ${val.failureItems.length}\n ToTal succes:${val.successItems.length}`, 'Success');
                  }
                });
                removeElements(document.querySelectorAll(".modal"));
                removeElements(document.querySelectorAll(".modal-backdrop"));
              }
            }))
          }
        },
      ],
      displayText: tableText,
      message: tableMessage,
      inlineEdit: false,
      searchFields: ['actionName', 'decription'],
      mainColumns: [
        {
          type: TableColumnType.Description,
          title: () => 'Name',
          valueRef: () => 'actionName',
          allowFilter: true
        },
        {
          type: TableColumnType.Description,
          title: () => 'Decription',
          allowFilter: true,
          valueRef: () => 'description',

        },

      ],
    });
  }
}
