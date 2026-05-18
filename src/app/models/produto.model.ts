export interface Produto {
  id:             number;
  nome:           string;
  custo:          number;
  preco:          number;
  madeira:        string;
  quantidade:     number;
  teor:           string;
  envelhecimento: string;
  volume?:        string;
  classificacao?: 'Prata' | 'Ouro';
  imagem?:        string;
}
