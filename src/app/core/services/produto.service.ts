import { Injectable, signal } from '@angular/core';
import { Produto } from '../models/produto.model';

@Injectable({ providedIn: 'root' })
export class ProdutoService {
  private _produtos = signal<Produto[]>([
    { id: 1, nome: 'Cachaça Tesourinha', custo: 49.90, preco: 80.00, madeira: 'Carvalho', quantidade: 25, teorAlcoolico: '42% Vol.', envelhecimento: '2 anos', volume: '670ml', tipo: 'Ouro', imagem: '' },
    { id: 2, nome: 'Cachaça Mineiriana', custo: 45.00, preco: 80.00, madeira: 'Carvalho', quantidade: 18, teorAlcoolico: '38% Vol.', envelhecimento: '1 ano', volume: '700ml', tipo: 'Branca', imagem: '' },
    { id: 3, nome: 'Cachaça Bem Me Quer', custo: 42.00, preco: 80.00, madeira: 'Carvalho', quantidade: 30, teorAlcoolico: '40% Vol.', envelhecimento: '1 ano', volume: '700ml', tipo: 'Branca', imagem: '' },
    { id: 4, nome: 'Dama da Noite', custo: 49.90, preco: 79.90, madeira: 'Amburana', quantidade: 25, teorAlcoolico: '40% Vol.', envelhecimento: '3 anos', volume: '700ml', tipo: 'Ouro', imagem: '' },
    { id: 5, nome: 'Cachaça Seleta', custo: 55.00, preco: 95.00, madeira: 'Bálsamo', quantidade: 12, teorAlcoolico: '43% Vol.', envelhecimento: '4 anos', volume: '700ml', tipo: 'Ouro', imagem: '' },
    { id: 6, nome: 'Minas Velha', custo: 38.00, preco: 65.00, madeira: 'Jequitibá', quantidade: 40, teorAlcoolico: '39% Vol.', envelhecimento: '2 anos', volume: '700ml', tipo: 'Branca', imagem: '' },
  ]);

  readonly produtos = this._produtos.asReadonly();

  getAll(): Produto[] {
    return this._produtos();
  }

  getById(id: number): Produto | undefined {
    return this._produtos().find(p => p.id === id);
  }

  salvar(produto: Omit<Produto, 'id'>): void {
    const lista = this._produtos();
    const novoId = lista.length ? Math.max(...lista.map(p => p.id)) + 1 : 1;
    this._produtos.update(ps => [...ps, { ...produto, id: novoId }]);
  }

  atualizar(id: number, produto: Partial<Produto>): void {
    this._produtos.update(ps =>
      ps.map(p => p.id === id ? { ...p, ...produto } : p)
    );
  }

  excluir(id: number): void {
    this._produtos.update(ps => ps.filter(p => p.id !== id));
  }

  getPaginado(page: number, pageSize: number): { data: Produto[]; total: number } {
    const todos = this._produtos();
    const start = (page - 1) * pageSize;
    return { data: todos.slice(start, start + pageSize), total: todos.length };
  }
}
