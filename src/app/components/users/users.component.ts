import { Component, OnInit, ViewChild } from '@angular/core';
import {LanguageService} from 'src/app/services/language/language.service';
import {CompactService} from 'src/app/services/compact/compact.service';
import {UsersService} from 'src/app/services/users/users.service';
import {Subscription} from 'rxjs/internal/Subscription';
import { moveItemInArray } from '@angular/cdk/drag-drop';
import {CdkTable} from '@angular/cdk/table';
import {Account} from '../../models/account.model';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  
  @ViewChild('table', {static: false}) table: CdkTable<{}[]>;
  subscription: Subscription;
  loading = false;
  compact = false;
  users: Account[] = [];
  tableHeaders: string[] = [];
  language: 'en' | 'fr' = 'en';
  columnHeaders: string[] = [];
  page: {title: string, description: string} = {title: '', description: ''};
  firstInArray;
  lastInArray;
  limit = 5;
  currentPage = 1;
  totalUsers = 0;

  constructor (
    private _languageService: LanguageService,
    private _compactService: CompactService,
    private _usersService: UsersService
    ) { }

  ngOnInit(): void {
    this._languageService.lang.subscribe(lang => {
      this.language = lang;
      this._usersService.userPage.subscribe(pageInfo => {
        this.page = pageInfo.page;
        this.tableHeaders = pageInfo.table;
      });
    });
    this._compactService.compact.subscribe(compact => this.compact = compact);
    this.subscription = this._usersService.users.subscribe((listOfUsers: Account[]) => {



      this.lastInArray = listOfUsers[(listOfUsers.length - 1)].firstName;
      this.firstInArray = listOfUsers[0].firstName;
      this.users = listOfUsers;
    });

    this._usersService.userTable.subscribe(columns => {
      this.columnHeaders = columns.users;
    });
    this._usersService.total.subscribe(total => this.totalUsers = total.size);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  dropRow(event) {
    const previousIndex = this.users.findIndex((d) => d === event.item.data);
    moveItemInArray(this.users, previousIndex, event.currentIndex);
    this.table.renderRows();
  }

  newPageClicked(event) {
    this.loading = true;
    if (event === this.currentPage + 1 || event === this.currentPage - 1 ) {
      if (this.currentPage === event) {

      } else {
          if (event === this.currentPage + 1) {
            this.paginator('plus', this._usersService.next(this.lastInArray, this.limit));
          } else if (event === this.currentPage - 1) {
            this.paginator('minus', this._usersService.prev(this.lastInArray, this.limit));
          }
          this._usersService.total.subscribe(data => {console.log(data); this.totalUsers = data.size; });
        }
      
    }
    this.loading = false;
  }

  private paginator(operator: string, callback: void) {
    if (operator === 'plus') {
      this.subscription.unsubscribe();
      this.currentPage = this.currentPage + 1;
      callback;
      this.subscription = this._usersService.users.subscribe(data => {
        this.lastInArray = data[(data.length - 1)].firstName;
        this.firstInArray = data[0].firstName;
        const databaseData = Object.keys(data).map(i => data[i]);
        this.users = databaseData;
      });
    } else if (operator === 'minus') {
      this.currentPage = this.currentPage - 1;
      callback;
      this.subscription.unsubscribe();
      this.subscription = this._usersService.users.subscribe(data => {
        this.lastInArray = data[(data.length - 1)].firstName;
        this.firstInArray = data[0].firstName;
        const databaseData = Object.keys(data).map(i => data[i]);
        this.users = databaseData;
      });
    }
  }


}
