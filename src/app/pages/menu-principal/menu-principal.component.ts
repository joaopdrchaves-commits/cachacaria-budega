import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-menu-principal',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="menu-page">
      <div class="menu-card">
        <div class="ornament">❧</div>
        <h1 class="menu-title">MENU PRINCIPAL</h1>
        <div class="ornament ornament--bottom">❧</div>

        <div class="menu-items">
          <a routerLink="/admin/produtos" class="menu-item">
            <span class="menu-icon">📦</span>
            <span class="menu-text">PRODUTOS</span>
            <span class="menu-arrow">&gt;</span>
          </a>

          <a routerLink="/admin/produtos/novo" class="menu-item">
            <span class="menu-icon">📦+</span>
            <span class="menu-text">NOVO PRODUTO</span>
            <span class="menu-arrow">&gt;</span>
          </a>

          <a routerLink="/admin/relatorios" class="menu-item">
            <span class="menu-icon">📋</span>
            <span class="menu-text">RELATÓRIOS</span>
            <span class="menu-arrow">&gt;</span>
          </a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .menu-page {
      min-height: calc(100vh - 160px);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem;
    }
    .menu-card {
      background: linear-gradient(160deg, #5c3317 0%, #3d1f08 60%, #2a1404 100%);
      border: 2px solid #8b6914;
      border-radius: 12px;
      padding: 2.5rem 3rem;
      width: 100%;
      max-width: 600px;
      text-align: center;
      box-shadow: 0 8px 40px rgba(0,0,0,0.5);
    }
    .ornament {
      font-size: 28px;
      color: #c8a84b;
      display: block;
    }
    .ornament--bottom { transform: scaleX(-1); margin-top: 4px; }
    .menu-title {
      font-size: 2.2rem;
      font-weight: 900;
      color: #f5e6c8;
      letter-spacing: 3px;
      margin: 0.3rem 0;
    }
    .menu-items {
      display: flex;
      flex-direction: column;
      gap: 1.2rem;
      margin-top: 2rem;
    }
    .menu-item {
      display: flex;
      align-items: center;
      background: linear-gradient(90deg, #f5e6c8, #ede0b0);
      border-radius: 8px;
      padding: 1.2rem 1.6rem;
      text-decoration: none;
      color: #3d1f08;
      font-weight: 900;
      font-size: 1.2rem;
      letter-spacing: 2px;
      transition: transform 0.15s, box-shadow 0.15s;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
      gap: 1rem;
    }
    .menu-item:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 18px rgba(0,0,0,0.4);
    }
    .menu-icon { font-size: 1.8rem; }
    .menu-text { flex: 1; text-align: left; color: #8b5e2a; }
    .menu-arrow { color: #8b5e2a; font-size: 1.4rem; font-weight: 900; }
  `]
})
export class MenuPrincipalComponent {}
