import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UseragreementPage } from './useragreement.page';

describe('InvitestorePage', () => {
  let component: UseragreementPage;
  let fixture: ComponentFixture<UseragreementPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UseragreementPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UseragreementPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
