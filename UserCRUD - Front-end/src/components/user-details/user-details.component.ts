import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  user: User | undefined;
  editingMode = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const userId = params['id'];
      this.userService.getUserById(userId).subscribe(user => {
        this.user = user;
      });
    });
  }

  onDelete(userId: number) {
    this.userService.deleteUser(userId).subscribe(
      () => {
        console.log('Usuário excluído com sucesso!');
        this.router.navigate(['']);
      },
      error => {
        console.error('Erro ao excluir o usuário:', error);
      }
    );
  }

  onUpdate(user: User) {
    if (this.editingMode) {
      this.userService.updateUser(user).subscribe(
        updatedUser => {
          console.log('Usuário atualizado com sucesso:', updatedUser);
          this.editingMode = false; 
          this.userService.getUserById(updatedUser.id).subscribe(user => {
            this.user = user;
          });
        },
        error => {
          console.error('Erro ao atualizar o usuário:', error);
        }
      );
    } else {
      this.editingMode = true; 
    }
  }
}
