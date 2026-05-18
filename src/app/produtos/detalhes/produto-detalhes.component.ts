import { Component, inject, signal, OnInit } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { ProdutoService } from '../../services/produto.service';
import { Produto } from '../../models/produto.model';

@Component({
  selector: 'app-produto-detalhes',
  standalone: true,
  imports: [RouterLink, NavbarComponent],
  templateUrl: './produto-detalhes.component.html',
  styleUrl: './produto-detalhes.component.scss',
})
export class ProdutoDetalhesComponent implements OnInit {
  private route   = inject(ActivatedRoute);
  private service = inject(ProdutoService);

  produto = signal<Produto | undefined>(undefined);

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) this.produto.set(this.service.getById(+id));
  }

  formatCurrency(v: number) {
    return v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }
}
