import { Component, OnInit } from '@angular/core';
import {LanguageService} from 'src/app/services/language/language.service';
import {CompactService} from 'src/app/services/compact/compact.service';
import {UsersService} from 'src/app/services/users/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  loading = false;
  compact = false;
  users: Account[] = [];
  tableHeaders: string[] = [];
  language: 'en' | 'fr' = 'en';
  columnHeaders: string[] = [];

  constructor(
    private _languageService: LanguageService,
    private _compactService: CompactService,
    private _usersService: UsersService
    ) { }

  ngOnInit(): void {
    this._usersService.users.subscribe((listOfUsers: Account[]) => {
      this.users = listOfUsers;
    });
  }

  dropRow(event) {

  }

  openEditModal(user){

  }

  openConfirmModal(user){

  }


}
