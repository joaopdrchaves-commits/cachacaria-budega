import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { ProdutoService } from '../../core/services/produto.service';
import { Produto } from '../../core/models/produto.model';

@Component({
  selector: 'app-produto-detalhe',
  standalone: true,
  imports: [RouterLink, CurrencyPipe],
  template: `
    <div class="detalhe-page">
      <div class="detalhe-card">
        @if (produto()) {
          <a routerLink="/produtos" class="btn-voltar">&lt; VOLTAR</a>
          <h2 class="detalhe-titulo">DETALHES DO PRODUTO</h2>

          <div class="detalhe-body">
            <div class="detalhe-img">
              @if (produto()!.imagem) {
                <img [src]="produto()!.imagem" [alt]="produto()!.nome" />
              } @else {
                <span class="emoji-bottle">🍶</span>
              }
            </div>

            <div class="detalhe-info">
              <div class="info-header">
                <div>
                  <h1 class="produto-nome">{{ produto()!.nome }}</h1>
                  <p class="produto-preco">{{ produto()!.preco | currency:'BRL':'symbol':'1.2-2' }}</p>
                </div>
                <div class="estoque-badge">
                  <p class="estoque-label">Estoque Disponível</p>
                  <p class="estoque-valor">{{ produto()!.quantidade }} unidades</p>
                </div>
              </div>

              <hr class="divider" />

              <div class="specs-grid">
                <div class="spec-item">
                  <span class="spec-icon">🛢️</span>
                  <div>
                    <p class="spec-label">Volume</p>
                    <p class="spec-valor">{{ produto()!.volume ?? '700ml' }}</p>
                  </div>
                </div>
                <div class="spec-item">
                  <span class="spec-icon">🪵</span>
                  <div>
                    <p class="spec-label">Madeira</p>
                    <p class="spec-valor">{{ produto()!.madeira }}</p>
                  </div>
                </div>
              </div>

              <hr class="divider" />

              <div class="specs-grid">
                <div class="spec-item">
                  <span class="spec-icon">💧</span>
                  <div>
                    <p class="spec-label">Teor Alcoólico</p>
                    <p class="spec-valor">{{ produto()!.teorAlcoolico }}</p>
                  </div>
                </div>
                <div class="spec-item">
                  <span class="spec-icon">📅</span>
                  <div>
                    <p class="spec-label">Envelhecimento</p>
                    <p class="spec-valor">{{ produto()!.envelhecimento }}</p>
                  </div>
                </div>
              </div>

              <hr class="divider" />
            </div>
          </div>
        } @else {
          <p class="nao-encontrado">Produto não encontrado.</p>
        }
      </div>
    </div>
  `,
  styles: [`
    .detalhe-page { padding: 2rem; min-height: calc(100vh - 160px); }
    .detalhe-card {
      background: linear-gradient(160deg, #5c3317 0%, #3d1f08 60%, #2a1404 100%);
      border: 2px solid #8b6914;
      border-radius: 12px;
      padding: 2rem 2.5rem;
      box-shadow: 0 8px 40px rgba(0,0,0,0.5);
    }
    .btn-voltar {
      display: inline-block;
      background: rgba(245,230,200,0.15);
      border: 1px solid #c8a84b;
      color: #f5e6c8;
      font-weight: 800;
      font-size: 13px;
      letter-spacing: 2px;
      padding: 8px 16px;
      border-radius: 6px;
      text-decoration: none;
      margin-bottom: 1rem;
    }
    .detalhe-titulo {
      text-align: center;
      color: #c8a84b;
      font-size: 1.5rem;
      letter-spacing: 3px;
      font-weight: 800;
      margin-bottom: 1.5rem;
      text-decoration: underline;
      text-underline-offset: 6px;
    }
    .detalhe-body { display: flex; gap: 2.5rem; align-items: flex-start; }
    .detalhe-img {
      flex: 0 0 320px;
      height: 420px;
      background: #f5e6c8;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }
    .detalhe-img img { height: 100%; object-fit: contain; }
    .emoji-bottle { font-size: 100px; }
    .detalhe-info { flex: 1; }
    .info-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 1rem;
    }
    .produto-nome { font-size: 1.8rem; font-weight: 900; color: #f5e6c8; }
    .produto-preco { font-size: 1.5rem; font-weight: 900; color: #f5e6c8; margin-top: 4px; }
    .estoque-badge {
      background: linear-gradient(90deg, #c8a84b, #a8872a);
      border-radius: 6px;
      padding: 10px 16px;
      text-align: center;
    }
    .estoque-label { font-size: 11px; color: #2a1404; font-weight: 700; letter-spacing: 1px; }
    .estoque-valor { font-size: 16px; color: #2a1404; font-weight: 900; }
    .divider { border: none; border-top: 1px solid rgba(200,168,75,0.3); margin: 1.2rem 0; }
    .specs-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
    .spec-item { display: flex; align-items: center; gap: 1rem; }
    .spec-icon { font-size: 2.2rem; }
    .spec-label { font-size: 12px; color: rgba(245,230,200,0.7); font-weight: 600; }
    .spec-valor { font-size: 1.1rem; font-weight: 900; color: #f5e6c8; }
    .nao-encontrado { color: #f5e6c8; text-align: center; font-size: 1.2rem; }
  `]
})
export class ProdutoDetalheComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private produtoService = inject(ProdutoService);

  produto = signal<Produto | undefined>(undefined);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) this.produto.set(this.produtoService.getById(+id));
  }
}
