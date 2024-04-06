import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-buscas-recentes',
    templateUrl: './buscas-recentes.component.html',
    styleUrls: ['./buscas-recentes.component.scss'],
})
export class BuscasRecentesComponent implements OnInit {

    pesquisasRecentes: string[] = ['Top Brasil', 'Top Global', 'Esquenta Sertanejo', 'Funk Hits', 'Pagodeira']
    campoPesquisa: string = '';

    constructor() {
    }

    ngOnInit(): void {
    }

    definirPesquisa(pesquisa: string) {
        this.campoPesquisa = pesquisa;
    }

    // Implementar busca
    buscar() {

    }

}
