import { Component, inject, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { ProdutoService } from '../../services/produto.service';

@Component({
  selector: 'app-admin-produtos',
  standalone: true,
  imports: [RouterLink, NavbarComponent],
  templateUrl: './admin-produtos.component.html',
  styleUrl: './admin-produtos.component.scss',
})
export class AdminProdutosComponent {
  private service = inject(ProdutoService);

  readonly Math = Math;
  pageSize      = 5;
  currentPage   = signal(1);

  produtos   = this.service.produtos;
  totalPages = computed(() => Math.ceil(this.produtos().length / this.pageSize));
  paginados  = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize;
    return this.produtos().slice(start, start + this.pageSize);
  });
  pages = computed(() => Array.from({ length: this.totalPages() }, (_, i) => i + 1));

  goTo(page: number) {
    if (page >= 1 && page <= this.totalPages()) this.currentPage.set(page);
  }

  deletar(id: number) {
    if (confirm('Deseja excluir este produto?')) this.service.remove(id);
  }

  formatCurrency(v: number) {
    return v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }
}
