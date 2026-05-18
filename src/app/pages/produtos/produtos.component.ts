import { Component, inject, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { ProdutoService } from '../../core/services/produto.service';

@Component({
  selector: 'app-produtos',
  standalone: true,
  imports: [RouterLink, CurrencyPipe],
  template: `
    <div class="produtos-page">
      <div class="produtos-card">
        <h1 class="titulo">PRODUTOS</h1>

        <div class="grid">
          @for (produto of produtosPagina(); track produto.id) {
            <div class="produto-card">
              <div class="produto-img">
                @if (produto.imagem) {
                  <img [src]="produto.imagem" [alt]="produto.nome" />
                } @else {
                  <span class="emoji-bottle">🍶</span>
                }
              </div>
              <div class="produto-info">
                <p class="produto-nome">{{ produto.nome }}</p>
                <p class="produto-tipo">{{ produto.tipo }} - {{ produto.madeira }}</p>
                <p class="produto-preco">{{ produto.preco | currency:'BRL':'symbol':'1.2-2' }}</p>
              </div>
              <a [routerLink]="['/produtos', produto.id]" class="btn-info">+ INFO</a>
              <button class="btn-carrinho">ADICIONAR AO CARRINHO</button>
            </div>
          }
        </div>

        <div class="paginacao">
          <span class="pag-info">Mostrando {{ inicio() + 1 }} a {{ fim() }} de {{ total() }} produtos</span>
          <div class="pag-btns">
            <button class="pag-btn" (click)="paginaAnterior()" [disabled]="pagina() === 1">&lt;</button>
            @for (p of paginas(); track p) {
              <button class="pag-btn" [class.ativo]="p === pagina()" (click)="irPara(p)">{{ p }}</button>
            }
            <button class="pag-btn" (click)="proximaPagina()" [disabled]="pagina() === totalPaginas()">&gt;</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .produtos-page {
      padding: 2rem;
      min-height: calc(100vh - 160px);
    }
    .produtos-card {
      background: linear-gradient(160deg, #5c3317 0%, #3d1f08 60%, #2a1404 100%);
      border: 2px solid #8b6914;
      border-radius: 12px;
      padding: 2rem;
      box-shadow: 0 8px 40px rgba(0,0,0,0.5);
    }
    .titulo {
      font-size: 2.2rem;
      font-weight: 900;
      color: #f5e6c8;
      letter-spacing: 3px;
      text-align: center;
      margin-bottom: 2rem;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1.5rem;
      margin-bottom: 2rem;
    }
    .produto-card {
      background: linear-gradient(180deg, #f5e6c8, #ede0b0);
      border-radius: 10px;
      padding: 1rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.6rem;
      box-shadow: 0 4px 16px rgba(0,0,0,0.3);
    }
    .produto-img {
      width: 100%;
      height: 240px;
      background: rgba(245,230,200,0.6);
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }
    .produto-img img {
      height: 100%;
      object-fit: contain;
    }
    .emoji-bottle { font-size: 80px; }
    .produto-info { text-align: center; }
    .produto-nome {
      font-weight: 900;
      color: #5c3317;
      font-size: 1rem;
    }
    .produto-tipo { color: #8b5e2a; font-size: 13px; font-weight: 600; }
    .produto-preco {
      font-weight: 900;
      color: #5c3317;
      font-size: 1.1rem;
      margin-top: 4px;
    }
    .btn-info {
      background: linear-gradient(90deg, #c8a84b, #a8872a);
      color: #2a1404;
      font-weight: 900;
      font-size: 12px;
      letter-spacing: 1px;
      padding: 7px 22px;
      border-radius: 20px;
      text-decoration: none;
      border: none;
    }
    .btn-carrinho {
      width: 100%;
      padding: 12px;
      background: transparent;
      border: 2px solid #8b5e2a;
      border-radius: 8px;
      color: #5c3317;
      font-weight: 900;
      font-size: 12px;
      letter-spacing: 1px;
      cursor: pointer;
      transition: background 0.2s;
    }
    .btn-carrinho:hover { background: rgba(139,94,42,0.15); }
    .paginacao {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-top: 1rem;
      border-top: 1px solid rgba(139,105,20,0.3);
    }
    .pag-info { color: #c8a84b; font-size: 13px; }
    .pag-btns { display: flex; gap: 6px; }
    .pag-btn {
      width: 36px; height: 36px;
      border-radius: 6px; border: none;
      background: rgba(245,230,200,0.15);
      color: #f5e6c8; font-weight: 700;
      cursor: pointer; transition: background 0.2s;
    }
    .pag-btn:hover:not(:disabled) { background: rgba(245,230,200,0.25); }
    .pag-btn.ativo { background: #c8a84b; color: #2a1404; }
    .pag-btn:disabled { opacity: 0.4; cursor: not-allowed; }
  `]
})
export class ProdutosComponent {
  private produtoService = inject(ProdutoService);

  pageSize = 3;
  pagina = signal(1);

  total = computed(() => this.produtoService.getAll().length);
  totalPaginas = computed(() => Math.ceil(this.total() / this.pageSize));
  paginas = computed(() => Array.from({ length: this.totalPaginas() }, (_, i) => i + 1));
  inicio = computed(() => (this.pagina() - 1) * this.pageSize);
  fim = computed(() => Math.min(this.inicio() + this.pageSize, this.total()));
  produtosPagina = computed(() => this.produtoService.getPaginado(this.pagina(), this.pageSize).data);

  irPara(p: number): void { this.pagina.set(p); }
  paginaAnterior(): void { if (this.pagina() > 1) this.pagina.update(p => p - 1); }
  proximaPagina(): void { if (this.pagina() < this.totalPaginas()) this.pagina.update(p => p + 1); }
}
