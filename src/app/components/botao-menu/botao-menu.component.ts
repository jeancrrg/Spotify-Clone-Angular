import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-botao-menu',
    templateUrl: './botao-menu.component.html',
    styleUrls: ['./botao-menu.component.scss'],
})
export class BotaoMenuComponent implements OnInit {

    // Define que essa variável poderá ser passada como parâmetro no html no formato []
    @Input()
    descricao = '';

    // Define que essa variável poderá ser passada como parâmetro no html no formato []
    @Input()
    selecionado = false;

    // Define que será exportada para o html no formato ()
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
