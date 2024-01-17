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
  user!: User;
  editingMode = false;
  feedbackMessage: string = '';
  feedbackType: 'success' | 'error' = 'error';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const userId = params['id'];
      this.userService.getUserById(userId).subscribe(
        user => {
          this.user = user;
        },
        error => {
          console.error('Erro ao obter detalhes do usuário:', error);
          this.setFeedbackMessage('Erro ao obter detalhes do usuário. Tente novamente mais tarde.');
        }
      );
    });
  }

  onDelete(userId: string) {
    this.userService.deleteUser(userId).subscribe(
      () => {
        this.setFeedbackMessage('Usuário excluído com sucesso!', 'success');
        this.router.navigate(['']);
      },
      error => {
        console.error('Erro ao excluir o usuário:', error);
        this.setFeedbackMessage('Erro ao excluir o usuário. Tente novamente mais tarde.', 'error');
      }
    );
  }
  
  onUpdate(user: User) {
    if (this.editingMode) {
      if (user.name.trim() !== '') {
        const phoneNumber = parseInt(user.phone, 10);
  
        if (!isNaN(phoneNumber)) {
          this.userService.updateUser(user).subscribe(
            updatedUser => {
              this.setFeedbackMessage('Usuário atualizado com sucesso!', 'success');
              this.editingMode = false; 
              this.user = updatedUser;
            },
            error => {
              console.error('Erro ao atualizar o usuário:', error);
              this.setFeedbackMessage('Erro ao atualizar o usuário. Verifique os dados e tente novamente.', 'error');
            }
          );
        } else {
          this.setFeedbackMessage('Número de telefone inválido. Certifique-se de inserir apenas números.', 'error');
        }
      } else {
        this.setFeedbackMessage('Nome está vazio.', 'error');
      }
    } else {
      this.editingMode = true; 
    }
  }
  
  
  private setFeedbackMessage(message: string, type: 'success' | 'error' = 'error'): void {
    this.feedbackMessage = message;
    this.feedbackType = type; 
    setTimeout(() => {
      this.feedbackMessage = ''; 
    }, 5000); 
  }
}
