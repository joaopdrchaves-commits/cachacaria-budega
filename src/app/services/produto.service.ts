import { Injectable, signal } from '@angular/core';
import { Produto } from '../models/produto.model';

@Injectable({ providedIn: 'root' })
export class ProdutoService {

  private _produtos = signal<Produto[]>([
    { id: 1, nome: 'Cachaça Tesourinha',  custo: 49.90, preco: 80.00, madeira: 'Carvalho', quantidade: 25, teor: '42%', envelhecimento: '2 anos', volume: '670ml', classificacao: 'Ouro',  imagem: '/assets/images/produtos/tesourinha.png' },
    { id: 2, nome: 'Cachaça Mineiriana',  custo: 38.00, preco: 80.00, madeira: 'Carvalho', quantidade: 18, teor: '39%', envelhecimento: '1 ano',  volume: '700ml', classificacao: 'Prata', imagem: '/assets/images/produtos/mineiriana.png' },
    { id: 3, nome: 'Cachaça Bem Me Quer', custo: 35.00, preco: 80.00, madeira: 'Carvalho', quantidade: 30, teor: '40%', envelhecimento: '3 anos', volume: '670ml', classificacao: 'Prata', imagem: '/assets/images/produtos/bem-me-quer.png' },
    { id: 4, nome: 'Cachaça do Brasil',   custo: 42.00, preco: 75.00, madeira: 'Amburana', quantidade: 20, teor: '40%', envelhecimento: '2 anos', volume: '700ml', classificacao: 'Prata', imagem: '/assets/images/produtos/cachaca-do-brasil.png' },
    { id: 5, nome: '1000 Montes',         custo: 55.00, preco: 95.00, madeira: 'Carvalho', quantidade: 15, teor: '41%', envelhecimento: '3 anos', volume: '700ml', classificacao: 'Ouro',  imagem: '/assets/images/produtos/1000-montes.png' },
  ]);

  readonly produtos = this._produtos.asReadonly();

  getById(id: number): Produto | undefined {
    return this._produtos().find(p => p.id === id);
  }

  add(produto: Omit<Produto, 'id'>): void {
    const newId = Math.max(...this._produtos().map(p => p.id), 0) + 1;
    this._produtos.update(list => [...list, { ...produto, id: newId }]);
  }

  update(id: number, dados: Partial<Produto>): void {
    this._produtos.update(list =>
      list.map(p => p.id === id ? { ...p, ...dados } : p)
    );
  }

  remove(id: number): void {
    this._produtos.update(list => list.filter(p => p.id !== id));
  }
}