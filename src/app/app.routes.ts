import { Routes } from '@angular/router';
import { LoginComponent }          from './login/login.component';
import { HomeComponent }           from './home/home.component';
import { AdminProdutosComponent }  from './admin/produtos/admin-produtos.component';
import { NovoProdutoComponent }    from './admin/novo-produto/novo-produto.component';
import { ProdutosListaComponent }  from './produtos/lista/produtos-lista.component';
import { ProdutoDetalhesComponent } from './produtos/detalhes/produto-detalhes.component';
import { SobreComponent }          from './sobre/sobre.component';

export const routes: Routes = [
  { path: '',                   redirectTo: 'login', pathMatch: 'full' },
  { path: 'login',              component: LoginComponent },
  { path: 'home',               component: HomeComponent },
  { path: 'admin/produtos',     component: AdminProdutosComponent },
  { path: 'admin/novo-produto', component: NovoProdutoComponent },
  { path: 'admin/editar/:id',   component: NovoProdutoComponent },
  { path: 'produtos',           component: ProdutosListaComponent },
  { path: 'produtos/:id',       component: ProdutoDetalhesComponent },
  { path: 'sobre',              component: SobreComponent },
  { path: '**',                 redirectTo: 'login' },
];
