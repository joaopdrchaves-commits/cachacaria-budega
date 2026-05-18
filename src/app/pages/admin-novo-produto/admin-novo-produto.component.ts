import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProdutoService } from '../../core/services/produto.service';

@Component({
  selector: 'app-admin-novo-produto',
  standalone: true,
  imports: [FormsModule, RouterLink],
  template: `
    <div class="form-page">
      <div class="form-card">
        <a routerLink="/admin/produtos" class="btn-voltar">&lt; VOLTAR</a>

        <div class="form-grid">
          <div class="form-group">
            <label class="form-label">NOME DO PRODUTO</label>
            <input class="form-input" type="text" placeholder="Ex.: Dama da Noite" [(ngModel)]="form.nome" />
          </div>

          <div class="form-group">
            <label class="form-label">VALOR DE CUSTO</label>
            <input class="form-input" type="number" placeholder="Ex.: 50,00" [(ngModel)]="form.custo" />
          </div>

          <div class="form-group">
            <label class="form-label">QUANT. ESTOQUE</label>
            <input class="form-input" type="number" placeholder="Ex.: 25" [(ngModel)]="form.quantidade" />
          </div>

          <div class="form-group">
            <label class="form-label">VALOR DE VENDA</label>
            <input class="form-input" type="number" placeholder="Ex.: 80,00" [(ngModel)]="form.preco" />
          </div>

          <div class="form-group">
            <label class="form-label">MADEIRA DE ENVELHECIMENTO</label>
            <input class="form-input" type="text" placeholder="Ex.: Carvalho" [(ngModel)]="form.madeira" />
          </div>

          <div class="form-group">
            <label class="form-label">ENVELHECIMENTO</label>
            <input class="form-input" type="text" placeholder="Ex.: 3 ANOS" [(ngModel)]="form.envelhecimento" />
          </div>

          <div class="form-group">
            <label class="form-label">TEOR ALCOÓLICO</label>
            <input class="form-input" type="text" placeholder="Ex.: 40%" [(ngModel)]="form.teorAlcoolico" />
          </div>

          <div class="form-group form-group--file">
            <label class="form-label">IMAGEM</label>
            <label class="btn-arquivo">
              SELECIONAR ARQUIVO (.png)
              <input type="file" accept=".png,.jpg,.jpeg" (change)="onFileChange($event)" hidden />
            </label>
            @if (preview()) {
              <img [src]="preview()" alt="preview" class="img-preview" />
            }
          </div>
        </div>

        @if (erro()) {
          <p class="erro-msg">{{ erro() }}</p>
        }

        <div class="form-footer">
          <button class="btn-salvar" (click)="salvar()">SALVAR 💾</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .form-page {
      padding: 2rem;
      min-height: calc(100vh - 160px);
    }
    .form-card {
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
      margin-bottom: 2rem;
    }
    .form-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1.4rem;
    }
    .form-group { display: flex; flex-direction: column; gap: 6px; }
    .form-group--file { justify-content: flex-start; }
    .form-label {
      font-size: 12px;
      font-weight: 800;
      color: #c8a84b;
      letter-spacing: 2px;
    }
    .form-input {
      background: #f5e6c8;
      border: none;
      border-radius: 6px;
      padding: 14px 16px;
      font-size: 15px;
      color: #3d1f08;
      font-family: inherit;
      outline: none;
    }
    .form-input::placeholder { color: #a08040; font-style: italic; }
    .btn-arquivo {
      background: linear-gradient(90deg, #c8a84b, #a8872a);
      color: #2a1404;
      font-weight: 900;
      font-size: 13px;
      letter-spacing: 1px;
      padding: 14px 16px;
      border-radius: 6px;
      cursor: pointer;
      text-align: center;
      display: block;
    }
    .img-preview {
      width: 100%;
      max-height: 120px;
      object-fit: contain;
      border-radius: 6px;
      margin-top: 8px;
    }
    .erro-msg { color: #ff6b6b; text-align: center; margin: 1rem 0; font-size: 13px; }
    .form-footer { display: flex; justify-content: center; margin-top: 2rem; }
    .btn-salvar {
      background: linear-gradient(90deg, #c8a84b, #a8872a);
      color: #2a1404;
      font-weight: 900;
      font-size: 18px;
      letter-spacing: 3px;
      padding: 16px 60px;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      transition: opacity 0.2s;
    }
    .btn-salvar:hover { opacity: 0.9; }
  `]
})
export class AdminNovoProdutoComponent implements OnInit {
  private produtoService = inject(ProdutoService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  form = { nome: '', custo: 0, preco: 0, madeira: '', quantidade: 0, teorAlcoolico: '', envelhecimento: '', volume: '700ml', imagem: '' };
  preview = signal('');
  erro = signal('');
  editandoId: number | null = null;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const produto = this.produtoService.getById(+id);
      if (produto) {
        this.editandoId = produto.id;
        this.form = { ...produto };
        this.preview.set(produto.imagem ?? '');
      }
    }
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.[0]) {
      const reader = new FileReader();
      reader.onload = e => {
        const url = e.target?.result as string;
        this.preview.set(url);
        this.form.imagem = url;
      };
      reader.readAsDataURL(input.files[0]);
    }
  }

  salvar(): void {
    if (!this.form.nome || !this.form.preco) {
      this.erro.set('Nome e valor de venda são obrigatórios.');
      return;
    }
    if (this.editandoId) {
      this.produtoService.atualizar(this.editandoId, this.form);
    } else {
      this.produtoService.salvar(this.form);
    }
    this.router.navigate(['/admin/produtos']);
  }
}
