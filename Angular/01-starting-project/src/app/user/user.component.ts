import { Component, Input, computed,input} from '@angular/core'; 
//Input is the decorator and input is the function to accept the input from angula core.
//by using input, you can replace @Input({required: true}) avatar!: string; and @Input({required: true}) name!: string; lines
// import { DUMMY_USERS } from '../dummy-users';
// const randomIndex = Math.floor(Math.random()*DUMMY_USERS.length);

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  //selectedUser = DUMMY_USERS[randomIndex];  //for zone.js
  // selectedUser = signal(DUMMY_USERS[randomIndex]); //1. initializing signal
  // imagePath = computed(() => `assets/users/${this.selectedUser().avatar}`);  //using computed function as it is going to change with the selectedUser signal and to avoid getter and setter.
  //getter and setter are used for zone.js
  /*
  get imagePath() {   //getter is used to get the selected user's avatar path
    return 'assets/users/' + this.selectedUser().avatar;  // return is used to return the selected folder path
  } //this is used as it is using the selectedUser property which is within the same class
   */

  // This code defines an input property called 'avatar' for the UserComponent.
  // The '@Input()' decorator tells Angular that this property can receive its value from a parent component.
  // The 'avatar!: string;' part declares that 'avatar' is a required string property.
  @Input({required: true}) avatar!: string; //by using required: true, we are telling Angular that this property is required and if it is not provided, it will throw an error.
  @Input({required: true}) name!: string; //Remember when you are using ! property, don't forget to use required property..
  
  //Signal Approach:
  //avatar = input.required<string>(); //replacing @Input({required: true}) avatar!: string;
  //name = input.required<string>(); //replacing @Input({required: true}) name!: string;
  
  get imagePath() {
  return `assets/users/${this.avatar}`;   // backticks
  }

  //Signal Approach:
  //As we are using signal functions, we don't need to use getters and setters.
  //imagePath = computed(() => {
  //  return 'assets/users/' + this.avatar();	 // same as `assets/users/${this.avatar()}`
  //}); //using computed function as it is going to change with the selectedUser signal and to avoid getter and setter.
  //imagePath = computed(() => `assets/users/${this.avatar()}`); //using computed function as it is going to change with the selectedUser signal and to avoid getter and setter.
  onSelectUser() {
    //const randomIndex = Math.floor(Math.random()*DUMMY_USERS.length);
    //this.selectedUser = DUMMY_USERS[randomIndex];
    //this.selectedUser.set(DUMMY_USERS[randomIndex]); //2. updating signal
  
  }
}
