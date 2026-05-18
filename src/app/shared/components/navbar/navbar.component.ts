import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <header class="navbar">
      <div class="navbar__logo">
        <a routerLink="/produtos">
          <div class="logo-badge">
            <span class="logo-subtitle">CACHAÇARIA</span>
            <span class="logo-title">Budega</span>
            <span class="logo-sub2">Mercado Central</span>
          </div>
        </a>
      </div>
      <nav class="navbar__nav">
        <a routerLink="/produtos" routerLinkActive="active" class="nav-item">
          <span class="nav-icon">🏠</span>
          <span>Início</span>
        </a>
        <a routerLink="/produtos" routerLinkActive="active" class="nav-item">
          <span class="nav-icon">📦</span>
          <span>Produtos</span>
        </a>
        <a routerLink="/sobre" routerLinkActive="active" class="nav-item">
          <span class="nav-icon">📰</span>
          <span>Novidades</span>
        </a>
        @if (!auth.isAdmin()) {
          <a routerLink="/carrinho" class="nav-item">
            <span class="nav-icon">🛒</span>
            <span>Carrinho</span>
          </a>
        }
        @if (auth.isLogado()) {
          <button class="nav-item nav-item--btn" (click)="auth.logout()">
            <span class="nav-icon">👤</span>
            <span>Sair</span>
          </button>
        } @else {
          <a routerLink="/login" class="nav-item">
            <span class="nav-icon">👤</span>
            <span>Entrar</span>
          </a>
        }
      </nav>
    </header>
  `,
  styles: [`
    .navbar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 2rem;
      background: url('/assets/wood-header.jpg') center/cover, #3d1f08;
      min-height: 160px;
      border-bottom: 4px solid #8b6914;
      position: relative;
      z-index: 100;
    }
    .logo-badge {
      background: linear-gradient(145deg, #f5e6b0, #dfc97a, #c8a84b);
      border: 3px solid #8b6914;
      border-radius: 4px 4px 40px 40px;
      padding: 10px 28px 18px;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-decoration: none;
      min-width: 180px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.4);
    }
    .logo-subtitle {
      font-size: 11px;
      letter-spacing: 3px;
      color: #5c3317;
      font-weight: 700;
    }
    .logo-title {
      font-size: 42px;
      font-weight: 900;
      color: #2d7a1f;
      line-height: 1;
      font-family: serif;
    }
    .logo-sub2 {
      font-size: 11px;
      letter-spacing: 2px;
      color: #5c3317;
    }
    .navbar__nav {
      display: flex;
      gap: 1.5rem;
      align-items: center;
    }
    .nav-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
      color: #f5e6c8;
      text-decoration: none;
      font-size: 12px;
      font-weight: 600;
      letter-spacing: 1px;
      cursor: pointer;
      background: none;
      border: none;
      font-family: inherit;
    }
    .nav-icon {
      background: rgba(245,230,200,0.15);
      border: 2px solid rgba(245,230,200,0.4);
      border-radius: 50%;
      width: 52px;
      height: 52px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 22px;
      transition: background 0.2s;
    }
    .nav-item:hover .nav-icon,
    .nav-item.active .nav-icon {
      background: rgba(245,230,200,0.3);
      border-color: #f5e6c8;
    }
    .nav-item--btn { padding: 0; }
  `]
})
export class NavbarComponent {
  auth = inject(AuthService);
}
