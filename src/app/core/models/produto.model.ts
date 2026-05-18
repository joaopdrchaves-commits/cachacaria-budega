export interface Produto {
  id: number;
  nome: string;
  custo: number;
  preco: number;
  madeira: string;
  quantidade: number;
  teorAlcoolico: string;
  envelhecimento: string;
  volume?: string;
  imagem?: string;
  tipo?: string; // 'Ouro' | 'Branca' | 'Envelhecida'
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}
