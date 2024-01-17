import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { v4 as uuidv4 } from 'uuid';
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  feedbackMessage: string = '';
  users: User[] = [];
  newUser: User = {
    id:'',
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
    this.feedbackMessage = ''; 
  
    if (this.newUser.name.trim() !== '') {
      const phoneNumber = parseInt(this.newUser.phone, 10);
  
      if (!isNaN(phoneNumber)) {
        this.newUser.id = uuidv4();
  
        this.userService.createUser(this.newUser).subscribe(
          (createdUser) => {
            console.log('Novo usuário criado:', createdUser);
            this.users.push(createdUser);
            this.clearNewUser();
            this.feedbackMessage = 'Usuário criado com sucesso.';
          },
          (error) => {
            console.error('Erro ao criar usuário:', error);
            this.feedbackMessage = 'Erro ao criar usuário. Verifique os dados e tente novamente.';
          }
        );
      } else {
        console.error('Número de telefone inválido. Certifique-se de inserir apenas números.');
        this.feedbackMessage = 'Número de telefone inválido. Certifique-se de inserir apenas números.';
      }
    } else {
      console.error('Nome está vazio.');
      this.feedbackMessage = 'Nome está vazio.';
    }
  }
  
  
  clearNewUser(): void {
    this.newUser.name = '';
    this.newUser.phone = '';
  }
}