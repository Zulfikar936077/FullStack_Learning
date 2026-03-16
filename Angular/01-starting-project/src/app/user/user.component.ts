import { Component } from '@angular/core';
import { DUMMY_USERS } from '../dummy-users';
const randomIndex = Math.floor(Math.random()*DUMMY_USERS.length);

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  selectedUser = DUMMY_USERS[randomIndex];

  get imagePath() {   //getter is used to get the selected user's avatar path
    return 'assets/users/' + this.selectedUser.avatar;  // return is used to return the selected folder path
  } //this is used as it is using the selectedUser property which is within the same class
  onSelectUser() {
    const randomIndex = Math.floor(Math.random()*DUMMY_USERS.length);
    this.selectedUser = DUMMY_USERS[randomIndex];
  }
}
