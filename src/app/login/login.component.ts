import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private fb     = inject(FormBuilder);
  private router = inject(Router);

  isLoading    = signal(false);
  showPassword = signal(false);
  errorMessage = signal('');

  form = this.fb.group({
    emailOrUser: ['', [Validators.required]],
    password:    ['', [Validators.required, Validators.minLength(6)]],
  });

  get emailOrUser() { return this.form.get('emailOrUser'); }
  get password()    { return this.form.get('password'); }

  togglePassword() { this.showPassword.update(v => !v); }

  async onSubmit() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.isLoading.set(true);
    this.errorMessage.set('');
    try {
      await new Promise(r => setTimeout(r, 1000));
      this.router.navigate(['/home']);
    } catch {
      this.errorMessage.set('E-mail/usuário ou senha incorretos.');
    } finally {
      this.isLoading.set(false);
    }
  }

  loginWithGoogle()   { console.log('Google OAuth'); }
  loginWithFacebook() { console.log('Facebook OAuth'); }
}
