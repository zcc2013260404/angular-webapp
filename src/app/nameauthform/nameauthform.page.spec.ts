import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddresseditPage } from './nameauthform.page';

describe('NameAuthForm', () => {
  let component: NameAuthFormPage;
  let fixture: ComponentFixture<NameAuthFormPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NameAuthFormPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NameAuthFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
