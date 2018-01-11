import {Language} from '../../models/language';
import {Component, Input, OnInit} from '@angular/core';
import {NgxTranslateService} from '../../service/ngx-tranlsate.service';

@Component({
  selector: 'gorkhas-language-switcher',
  templateUrl: './language-switcher.component.html',
  styleUrls: ['./language-switcher.component.scss']
})
export class LanguageSwitcherComponent implements OnInit {

  @Input() languages: Language[] = [{label: 'English', key: 'en'}, {label: 'Nepali', key: 'np'}];

  constructor(private ngxTranslationService: NgxTranslateService) {
  }

  ngOnInit() {
  }

  changeLanguage(lang: Language) {
    this.ngxTranslationService.useLang(lang.key);
  }

}
