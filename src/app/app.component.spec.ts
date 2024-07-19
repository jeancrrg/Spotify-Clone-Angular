import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { Component } from '@angular/core';

describe(AppComponent.name, () => {
    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [AppComponent],
        });
        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
    });

    it('Deveria criar o componente', () => {
        expect(Component).toBeTruthy();
    });

});
