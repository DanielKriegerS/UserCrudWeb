import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  newUser: User = {
    id: 0, 
    name: '',
    phone: ''
  };

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

  createUser(): void {
    if (this.newUser.name.trim() !== '' && this.newUser.phone.trim() !== '') {
      this.userService.createUser(this.newUser).subscribe(
        (createdUser) => {
          console.log('Novo usuário criado:', createdUser);
          this.users.push(createdUser); 
          this.clearNewUser(); 
        },
        (error) => {
          console.error('Erro ao criar usuário:', error);
        }
      );
    } else {
      console.error('Nome e/ou telefone estão vazios.');
    }
  }

  clearNewUser(): void {
    this.newUser.name = '';
    this.newUser.phone = '';
  }
}
