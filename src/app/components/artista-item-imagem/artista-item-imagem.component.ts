import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-artista-item-imagem',
    templateUrl: './artista-item-imagem.component.html',
    styleUrls: ['./artista-item-imagem.component.scss'],
})
export class ArtistaItemImagemComponent implements OnInit {

    @Input()
    imagemSrc: string = '';

    // Define que essa variável poderá ser passada como parâmetro no html no formato []
    @Input()
    descricao = '';

    // Define que essa variável poderá ser passada como parâmetro no html no formato []
    @Input()
    selecionado = false;

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
