export interface LoginRequest {
  email: string;
  senha: string;
}

export interface Usuario {
  id: number;
  nome: string;
  email: string;
  perfil: 'admin' | 'cliente';
  token?: string;
}
