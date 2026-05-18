import { Component } from '@angular/core';

@Component({
  selector: 'app-sobre-nos',
  standalone: true,
  template: `
    <div class="sobre-page">
      <div class="sobre-card">
        <h1 class="sobre-titulo">SOBRE NÓS...</h1>
        <div class="sobre-texto">
          <p>
            A Cachaçaria Budega é mais do que uma loja no Mercado Central, é um manifesto
            a favor da cachaça de verdade.
          </p>
          <p>
            Inauguramos nosso espaço em agosto de 2025 para mostrar que a cachaça é um
            destilado nobre e cheio de nuances. Nosso maior desafio — e nossa maior
            paixão — é quebrar preconceitos e apresentar o altíssimo nível da produção nacional.
          </p>
          <p>
            Trabalhamos exclusivamente com o modelo de curadoria e revenda. Isso significa que
            cada rótulo disponível aqui foi avaliado e escolhido com o rigor técnico de nossas
            sommeliers especialistas. Nosso catálogo é pensado para abraçar todas as gerações:
            preservamos a riqueza histórica e as madeiras clássicas que os clientes tradicionais
            valorizam, enquanto apresentamos uma experiência nova e surpreendente para os
            paladares mais jovens.
          </p>
          <p>
            Permita-se uma nova experiência e descubra o rótulo que vai elevar o seu conceito sobre cachaça.
          </p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .sobre-page {
      padding: 2rem;
      min-height: calc(100vh - 160px);
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .sobre-card {
      background: linear-gradient(160deg, #5c3317 0%, #3d1f08 60%, #2a1404 100%);
      border: 2px solid #8b6914;
      border-radius: 12px;
      padding: 3rem;
      max-width: 900px;
      width: 100%;
      box-shadow: 0 8px 40px rgba(0,0,0,0.5);
    }
    .sobre-titulo {
      font-size: 2.4rem;
      font-weight: 900;
      color: #f5e6c8;
      letter-spacing: 3px;
      text-align: center;
      margin-bottom: 2rem;
    }
    .sobre-texto p {
      color: #f5e6c8;
      font-weight: 700;
      font-size: 1.05rem;
      line-height: 1.7;
      margin-bottom: 1.2rem;
    }
  `]
})
export class SobreNosComponent {}
