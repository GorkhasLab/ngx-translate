import {NgxTranslateService} from '../../service/ngx-tranlsate.service';
/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';

import {LanguageSwitcherComponent} from './language-switcher.component';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {buildNgxTranslationProvider} from '../../ngx-translate.module';
import {NgxTranslateLoader} from '../../service/ngx-translate-loader.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {NGXLogger, NGXLoggerMock} from 'ngx-logger';

describe('LanguageSwitcherComponent', () => {
  let comp: LanguageSwitcherComponent;
  let fixture: ComponentFixture<LanguageSwitcherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: NgxTranslateLoader}
        })
      ],
      declarations: [LanguageSwitcherComponent],
      providers: [
        {provide: NGXLogger, useClass: NGXLoggerMock},
        buildNgxTranslationProvider('', ''),
        NgxTranslateService
      ]
    })
      .compileComponents().then(() => {
      fixture = TestBed.createComponent(LanguageSwitcherComponent);
      comp = fixture.componentInstance;
    });
  }));

  it('should create component', () => expect(comp).toBeDefined());

  it('should have expected <li> text', () => {
    comp.languages = [{label: 'French', key: 'fr'}];
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const liDe = fixture.debugElement.query(By.css('li'));
      const li = liDe.nativeElement;
      expect(li.innerText).toEqual('French');
    });
  });
});
