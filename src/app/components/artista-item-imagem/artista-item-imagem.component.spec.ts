import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ArtistaItemImagemComponent } from './artista-item-imagem.component';

describe(ArtistaItemImagemComponent.name, () => {
    let component: ArtistaItemImagemComponent;
    let fixture: ComponentFixture<ArtistaItemImagemComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ArtistaItemImagemComponent],
        });
        fixture = TestBed.createComponent(ArtistaItemImagemComponent);
        component = fixture.componentInstance;
    });

    it('Deveria criar o componente', () => {
        expect(component).toBeTruthy();
    });

    it(`#${ArtistaItemImagemComponent.prototype.onClick.name} deveria emitir um evento`, () => {
        spyOn(component.click, 'emit');
        component.onClick();
        expect(component.click.emit).toHaveBeenCalled();
    });

});
