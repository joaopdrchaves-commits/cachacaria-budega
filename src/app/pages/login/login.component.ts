import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  template: `
    <div class="login-page">
      <div class="login-card">
        <h1 class="login-title">FAÇA SEU LOGIN</h1>

        <div class="form-group">
          <label class="form-label">E-MAIL OU USUÁRIO</label>
          <div class="input-wrapper">
            <span class="input-icon">✉️</span>
            <input
              type="email"
              class="form-input"
              placeholder="contato@e-mail.com"
              [(ngModel)]="email"
            />
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">SENHA</label>
          <div class="input-wrapper">
            <span class="input-icon">🔒</span>
            <input
              [type]="mostrarSenha() ? 'text' : 'password'"
              class="form-input"
              placeholder="••••••••••"
              [(ngModel)]="senha"
            />
            <button class="toggle-senha" (click)="mostrarSenha.update(v => !v)" type="button">
              {{ mostrarSenha() ? '🙈' : '👁️' }}
            </button>
          </div>
          <a href="#" class="esqueceu">Esqueceu a senha?</a>
        </div>

        @if (erro()) {
          <p class="erro-msg">{{ erro() }}</p>
        }

        <button class="btn-login" (click)="fazerLogin()">
          LOGIN →
        </button>

        <p class="ou-acesso">ou acesso com:</p>
        <div class="social-btns">
          <button class="social-btn">G</button>
          <button class="social-btn social-btn--fb">f</button>
        </div>

        <p class="criar-conta">
          Não tem uma Conta? <a routerLink="/login">Crie nova conta</a>
        </p>
      </div>
    </div>
  `,
  styles: [`
    .login-page {
      min-height: calc(100vh - 160px);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem;
    }
    .login-card {
      background: linear-gradient(160deg, #5c3317 0%, #3d1f08 60%, #2a1404 100%);
      border: 2px solid #8b6914;
      border-radius: 12px;
      padding: 2.5rem 3rem;
      width: 100%;
      max-width: 560px;
      box-shadow: 0 8px 40px rgba(0,0,0,0.5);
    }
    .login-title {
      font-size: 2rem;
      font-weight: 900;
      color: #f5e6c8;
      text-align: center;
      margin-bottom: 2rem;
      letter-spacing: 2px;
    }
    .form-group { margin-bottom: 1.4rem; }
    .form-label {
      display: block;
      font-size: 13px;
      font-weight: 800;
      color: #c8a84b;
      letter-spacing: 2px;
      margin-bottom: 6px;
    }
    .input-wrapper {
      display: flex;
      align-items: center;
      background: #f5e6c8;
      border-radius: 6px;
      overflow: hidden;
    }
    .input-icon {
      padding: 0 12px;
      font-size: 18px;
      background: #dfc98a;
      height: 100%;
      display: flex;
      align-items: center;
      border-right: 1px solid #c8a84b;
      padding: 12px;
    }
    .form-input {
      flex: 1;
      border: none;
      background: transparent;
      padding: 14px 12px;
      font-size: 15px;
      color: #3d1f08;
      outline: none;
      font-family: inherit;
    }
    .form-input::placeholder { color: #a08040; }
    .toggle-senha {
      background: none;
      border: none;
      padding: 0 12px;
      cursor: pointer;
      font-size: 18px;
    }
    .esqueceu {
      display: block;
      text-align: right;
      color: #c8a84b;
      font-size: 13px;
      margin-top: 6px;
      font-weight: 600;
    }
    .erro-msg {
      color: #ff6b6b;
      font-size: 13px;
      text-align: center;
      margin-bottom: 0.5rem;
    }
    .btn-login {
      width: 100%;
      padding: 16px;
      background: linear-gradient(90deg, #c8a84b, #a8872a);
      border: none;
      border-radius: 6px;
      color: #2a1404;
      font-size: 18px;
      font-weight: 900;
      letter-spacing: 4px;
      cursor: pointer;
      margin-top: 0.5rem;
      transition: opacity 0.2s;
    }
    .btn-login:hover { opacity: 0.9; }
    .ou-acesso {
      text-align: center;
      color: #f5e6c8;
      margin: 1.2rem 0 0.8rem;
      font-size: 14px;
    }
    .social-btns {
      display: flex;
      gap: 1rem;
      justify-content: center;
      margin-bottom: 1.4rem;
    }
    .social-btn {
      width: 52px;
      height: 52px;
      border-radius: 50%;
      border: none;
      background: #fff;
      font-size: 22px;
      font-weight: 900;
      cursor: pointer;
      color: #ea4335;
      box-shadow: 0 2px 8px rgba(0,0,0,0.3);
    }
    .social-btn--fb { color: #1877f2; }
    .criar-conta {
      text-align: center;
      color: #f5e6c8;
      font-size: 14px;
    }
    .criar-conta a { color: #c8a84b; font-weight: 700; }
  `]
})
export class LoginComponent {
  private auth = inject(AuthService);
  private router = inject(Router);

  email = '';
  senha = '';
  mostrarSenha = signal(false);
  erro = signal('');

  fazerLogin(): void {
    if (!this.email || !this.senha) {
      this.erro.set('Preencha e-mail e senha.');
      return;
    }
    const ok = this.auth.login({ email: this.email, senha: this.senha });
    if (ok) {
      const destino = this.auth.isAdmin() ? '/menu' : '/produtos';
      this.router.navigate([destino]);
    } else {
      this.erro.set('E-mail ou senha inválidos.');
    }
  }
}
