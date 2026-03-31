import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { UserComponent } from './user/user.component';
import { DUMMY_USERS } from './dummy-users'; //3. importing dummy users from dummy-users.ts

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, UserComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  users = DUMMY_USERS; //4. initializing users property with dummy users from dummy-users.ts

  //Declare the onSelectUser function here to use it in the app.component.html file.
  onSelectUser(id: string) {
    console.log('Selected user with id: ' + id); //Now move to app.component.html file to handle the event.
  }
}
