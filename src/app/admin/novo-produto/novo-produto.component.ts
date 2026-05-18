import { Component, inject, signal, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { ProdutoService } from '../../services/produto.service';

@Component({
  selector: 'app-novo-produto',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, NavbarComponent],
  templateUrl: './novo-produto.component.html',
  styleUrl: './novo-produto.component.scss',
})
export class NovoProdutoComponent implements OnInit {
  private fb      = inject(FormBuilder);
  private router  = inject(Router);
  private route   = inject(ActivatedRoute);
  private service = inject(ProdutoService);

  isEdit      = signal(false);
  editId      = signal<number | null>(null);
  isSaving    = signal(false);
  previewUrl  = signal<string | null>(null);
  nomeArquivo = signal<string>('Nenhum arquivo selecionado');

  form = this.fb.group({
    nome:           ['', Validators.required],
    quantidade:     ['', Validators.required],
    madeira:        ['', Validators.required],
    teor:           ['', Validators.required],
    custo:          ['', Validators.required],
    preco:          ['', Validators.required],
    envelhecimento: ['', Validators.required],
    volume:         ['', Validators.required],
    classificacao:  ['', Validators.required],
    imagem:         [''],
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const produto = this.service.getById(+id);
      if (produto) {
        this.isEdit.set(true);
        this.editId.set(produto.id);
        this.form.patchValue({
          nome:           produto.nome,
          quantidade:     String(produto.quantidade),
          madeira:        produto.madeira,
          teor:           produto.teor,
          custo:          String(produto.custo),
          preco:          String(produto.preco),
          envelhecimento: produto.envelhecimento,
          volume:         produto.volume ?? '',
          classificacao:  produto.classificacao ?? '',
        });
        if (produto.imagem) {
          this.previewUrl.set(produto.imagem);
          this.nomeArquivo.set(produto.imagem.split('/').pop() ?? '');
        }
      }
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;

    const file = input.files[0];
    this.nomeArquivo.set(file.name);

    const reader = new FileReader();
    reader.onload = () => {
      this.previewUrl.set(reader.result as string);
      this.form.patchValue({ imagem: reader.result as string });
    };
    reader.readAsDataURL(file);
  }

  abrirSeletor(): void {
    document.getElementById('fileInput')?.click();
  }

  async salvar(): Promise<void> {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.isSaving.set(true);

    await new Promise(r => setTimeout(r, 600));

    const v = this.form.value;
    const dados = {
      nome:           v.nome!,
      quantidade:     Number(v.quantidade),
      madeira:        v.madeira!,
      teor:           v.teor!,
      custo:          Number(v.custo),
      preco:          Number(v.preco),
      envelhecimento: v.envelhecimento!,
      volume:         v.volume ?? '',
      classificacao:  v.classificacao as 'Prata' | 'Ouro',
      imagem:         v.imagem ?? '',
    };

    if (this.isEdit() && this.editId()) {
      this.service.update(this.editId()!, dados);
    } else {
      this.service.add(dados);
    }

    this.isSaving.set(false);
    this.router.navigate(['/admin/produtos']);
  }
}
