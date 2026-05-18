import { Component, inject, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProdutoService } from '../../core/services/produto.service';
import { Produto } from '../../core/models/produto.model';

@Component({
  selector: 'app-admin-produtos',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="admin-page">
      <div class="admin-card">
        <div class="card-header">
          <h1 class="card-title">PRODUTOS</h1>
          <a routerLink="/admin/produtos/novo" class="btn-novo">+ NOVO PRODUTO</a>
        </div>

        <table class="tabela">
          <thead>
            <tr>
              <th>IMAGEM</th>
              <th>NOME</th>
              <th>CUSTO</th>
              <th>PREÇO</th>
              <th>MADEIRA</th>
              <th>QUANTIDADE</th>
              <th>AÇÕES</th>
            </tr>
          </thead>
          <tbody>
            @for (produto of produtosPagina(); track produto.id) {
              <tr>
                <td>
                  <div class="img-placeholder">
                    @if (produto.imagem) {
                      <img [src]="produto.imagem" [alt]="produto.nome" />
                    } @else {
                      🍶
                    }
                  </div>
                </td>
                <td class="td-nome">{{ produto.nome }}</td>
                <td>{{ produto.custo | currency:'BRL':'symbol':'1.2-2' }}</td>
                <td>{{ produto.preco | currency:'BRL':'symbol':'1.2-2' }}</td>
                <td>{{ produto.madeira | uppercase }}</td>
                <td>{{ produto.quantidade }}</td>
                <td class="td-acoes">
                  <a [routerLink]="['/admin/produtos', produto.id, 'editar']" class="btn-acao btn-editar" title="Editar">✏️</a>
                  <button class="btn-acao btn-excluir" (click)="excluir(produto)" title="Excluir">🗑️</button>
                </td>
              </tr>
            }
          </tbody>
        </table>

        <div class="paginacao">
          <span class="pag-info">
            Mostrando {{ inicio() + 1 }} a {{ fim() }} de {{ total() }} produtos
          </span>
          <div class="pag-btns">
            <button class="pag-btn" (click)="paginaAnterior()" [disabled]="pagina() === 1">&lt;</button>
            @for (p of paginas(); track p) {
              <button
                class="pag-btn"
                [class.ativo]="p === pagina()"
                (click)="irPara(p)"
              >{{ p }}</button>
            }
            <button class="pag-btn" (click)="proximaPagina()" [disabled]="pagina() === totalPaginas()">&gt;</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .admin-page {
      padding: 2rem;
      min-height: calc(100vh - 160px);
    }
    .admin-card {
      background: linear-gradient(160deg, #5c3317 0%, #3d1f08 60%, #2a1404 100%);
      border: 2px solid #8b6914;
      border-radius: 12px;
      padding: 2rem;
      box-shadow: 0 8px 40px rgba(0,0,0,0.5);
    }
    .card-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 1.5rem;
    }
    .card-title {
      font-size: 2rem;
      font-weight: 900;
      color: #f5e6c8;
      letter-spacing: 2px;
    }
    .btn-novo {
      background: linear-gradient(90deg, #c8a84b, #a8872a);
      color: #2a1404;
      font-weight: 900;
      font-size: 14px;
      letter-spacing: 1px;
      padding: 10px 20px;
      border-radius: 6px;
      text-decoration: none;
      border: none;
      cursor: pointer;
    }
    .tabela {
      width: 100%;
      border-collapse: collapse;
    }
    .tabela th {
      color: #c8a84b;
      font-size: 12px;
      letter-spacing: 2px;
      font-weight: 800;
      text-align: left;
      padding: 10px 12px;
      border-bottom: 2px solid #8b6914;
    }
    .tabela td {
      color: #f5e6c8;
      font-weight: 700;
      padding: 14px 12px;
      border-bottom: 1px solid rgba(139,105,20,0.3);
      font-size: 14px;
    }
    .img-placeholder {
      width: 48px;
      height: 48px;
      background: rgba(245,230,200,0.1);
      border-radius: 6px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 22px;
      overflow: hidden;
    }
    .img-placeholder img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .td-acoes { display: flex; gap: 8px; align-items: center; }
    .btn-acao {
      background: none;
      border: none;
      font-size: 18px;
      cursor: pointer;
      padding: 4px;
      border-radius: 4px;
      transition: background 0.2s;
    }
    .btn-acao:hover { background: rgba(255,255,255,0.1); }
    .paginacao {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 1.5rem;
      padding-top: 1rem;
      border-top: 1px solid rgba(139,105,20,0.3);
    }
    .pag-info { color: #c8a84b; font-size: 13px; }
    .pag-btns { display: flex; gap: 6px; }
    .pag-btn {
      width: 36px;
      height: 36px;
      border-radius: 6px;
      border: none;
      background: rgba(245,230,200,0.15);
      color: #f5e6c8;
      font-weight: 700;
      cursor: pointer;
      transition: background 0.2s;
    }
    .pag-btn:hover:not(:disabled) { background: rgba(245,230,200,0.25); }
    .pag-btn.ativo { background: #c8a84b; color: #2a1404; }
    .pag-btn:disabled { opacity: 0.4; cursor: not-allowed; }
  `]
})
export class AdminProdutosComponent {
  private produtoService = inject(ProdutoService);

  pageSize = 5;
  pagina = signal(1);

  total = computed(() => this.produtoService.getAll().length);
  totalPaginas = computed(() => Math.ceil(this.total() / this.pageSize));
  paginas = computed(() => Array.from({ length: this.totalPaginas() }, (_, i) => i + 1));
  inicio = computed(() => (this.pagina() - 1) * this.pageSize);
  fim = computed(() => Math.min(this.inicio() + this.pageSize, this.total()));
  produtosPagina = computed(() => {
    const { data } = this.produtoService.getPaginado(this.pagina(), this.pageSize);
    return data;
  });

  irPara(p: number): void { this.pagina.set(p); }
  paginaAnterior(): void { if (this.pagina() > 1) this.pagina.update(p => p - 1); }
  proximaPagina(): void { if (this.pagina() < this.totalPaginas()) this.pagina.update(p => p + 1); }

  excluir(produto: Produto): void {
    if (confirm(`Excluir "${produto.nome}"?`)) {
      this.produtoService.excluir(produto.id);
    }
  }
}
