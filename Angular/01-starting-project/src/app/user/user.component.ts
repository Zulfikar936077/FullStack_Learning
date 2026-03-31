import { Component, EventEmitter, Input, Output } from '@angular/core';
//Input and Output are decorators for ng approach.
//input and output are functions for signal approach.
// @Input / @Output are decorators; input()/output() in comments below are the signal-based alternative.
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
  //ng approach:
  @Input({required: true}) avatar!: string; //by using required: true, we are telling Angular that this property is required and if it is not provided, it will throw an error.
  @Input({required: true}) name!: string; //Remember when you are using ! property, don't forget to use required property..
  //Acquiring the id of the users to output it on the onSelectUser function.
  @Input({required: true}) id!: string; //In the dummy-users.ts file, the id is already defined as a string.
  
  //Output decorator:
  //For this, the @Select component is used with the Output component from the Angular Core.
  //In this case, an initial value is used which is an event emitter. This event emitter is also brought from the Angular Core.
  //Then event emitter will be emitted by the onSelectUser function.
  @Output() select = new EventEmitter<string>();

  //Signal Approach:
  //id = input.required<string>(); //required so this.id() is string (not string | undefined) for select.emit
  //avatar = input.required<string>(); //replacing @Input({required: true}) avatar!: string;
  //name = input.required<string>(); //replacing @Input({required: true}) name!: string;
  //select = output<string>(); //output is the function to accept the output from the Angular Core.
  //Now, we can use the select function in the onSelectUser function.
  get imagePath() {
    //ng approach:
    return `assets/users/${this.avatar}`;
    //signal approach:
    //return `assets/users/${this.avatar()}`;
  }

  //Signal Approach:
  //As we are using signal functions, we don't need to use getters and setters.
  //imagePath = computed(() => {
  //  return 'assets/users/' + this.avatar();	 // same as `assets/users/${this.avatar()}`
  //}); //using computed function as it is going to change with the selectedUser signal and to avoid getter and setter.
  //imagePath = computed(() => `assets/users/${this.avatar()}`); //using computed function as it is going to change with the selectedUser signal and to avoid getter and setter.
  
  //onSelectUser function will be used to emit the event to the parent component.
  onSelectUser() {
    //const randomIndex = Math.floor(Math.random()*DUMMY_USERS.length);
    //this.selectedUser = DUMMY_USERS[randomIndex];
    //this.selectedUser.set(DUMMY_USERS[randomIndex]); //2. updating signal
    //ng approach: 
    this.select.emit(this.id); //emitting the id of the user to the parent component.
    //signal approach: this.select.emit(this.id()); //emitting the id of the user to the parent component.
    //After emitting the event, move to app.component.html file to handle the event. Because the app.component.html file is the file that will show the broader version of the details on click of each user.
  }
}
