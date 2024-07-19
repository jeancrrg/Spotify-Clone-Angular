import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-artista-item-imagem',
    templateUrl: './artista-item-imagem.component.html',
    styleUrls: ['./artista-item-imagem.component.scss'],
})
export class ArtistaItemImagemComponent implements OnInit {

    // @Input = Define que essa variável poderá ser passada como parâmetro no html no formato []
    @Input()
    imagemSrc: string = '';

    @Input()
    descricao = '';

    @Input()
    selecionado = false;

    // @Output = Define que essa variável será exposta para ser usada no html no formato ()
    @Output()
    click = new EventEmitter<void>();

    constructor() {
    }

    ngOnInit(): void {
    }

    onClick() {
        this.click.emit();
    }

}
