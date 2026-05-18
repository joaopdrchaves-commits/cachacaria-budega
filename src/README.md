# Cachaçaria Budega — Angular 20

## Como usar

1. Crie um projeto Angular 20 novo:
   ```bash
   ng new budega --style=scss --routing=true
   cd budega
   ```

2. **Substitua a pasta `src/`** do projeto pela pasta `src/` deste arquivo.

3. Adicione a imagem de fundo:
   - Salve sua foto do armazém em `src/assets/images/background.jpg`
   - No `login.component.scss`, descomente as linhas indicadas no `.page-bg`

4. Rode o projeto:
   ```bash
   ng serve
   ```

5. Acesse: http://localhost:4200

---

## Estrutura

```
src/
├── app/
│   ├── login/
│   │   ├── login.component.ts    ← lógica (signals, reactive forms)
│   │   ├── login.component.html  ← template fiel ao Figma
│   │   └── login.component.scss  ← estilos (tema madeira/ouro)
│   ├── app.component.ts          ← root component com <router-outlet>
│   ├── app.config.ts             ← provideRouter configurado
│   └── app.routes.ts             ← rotas (adicione as próximas aqui)
├── assets/
│   └── images/                   ← coloque background.jpg aqui
├── index.html
├── main.ts
└── styles.scss
```

---

## Próximas rotas para adicionar em app.routes.ts

```ts
{ path: 'home',             component: HomeComponent },
{ path: 'produtos',         component: ProdutosComponent },
{ path: 'cadastro',         component: CadastroComponent },
{ path: 'recuperar-senha',  component: RecuperarSenhaComponent },
```

## TODO no login.component.ts

Substitua o `setTimeout` pelo seu serviço de autenticação:
```ts
await this.authService.login(this.form.value);
```
