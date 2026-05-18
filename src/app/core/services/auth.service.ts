import { Injectable, signal, computed } from '@angular/core';
import { Router } from '@angular/router';
import { LoginRequest, Usuario } from '../models/usuario.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _usuario = signal<Usuario | null>(this.carregarUsuario());
  
  readonly usuario = this._usuario.asReadonly();
  readonly isLogado = computed(() => !!this._usuario());
  readonly isAdmin = computed(() => this._usuario()?.perfil === 'admin');

  constructor(private router: Router) {}

  private carregarUsuario(): Usuario | null {
    const salvo = localStorage.getItem('budega_usuario');
    return salvo ? JSON.parse(salvo) : null;
  }

  login(req: LoginRequest): boolean {
    // Mock: troque por HttpClient quando tiver API
    const mockAdmin: Usuario = {
      id: 1,
      nome: 'Administrador',
      email: req.email,
      perfil: 'admin',
      token: 'mock-token-admin-123',
    };
    const mockCliente: Usuario = {
      id: 2,
      nome: 'Cliente',
      email: req.email,
      perfil: 'cliente',
      token: 'mock-token-cliente-456',
    };

    // Simulação: email com "admin" → perfil admin
    const usuario = req.email.includes('admin') ? mockAdmin : mockCliente;
    this._usuario.set(usuario);
    localStorage.setItem('budega_usuario', JSON.stringify(usuario));
    return true;
  }

  logout(): void {
    this._usuario.set(null);
    localStorage.removeItem('budega_usuario');
    this.router.navigate(['/login']);
  }
}
