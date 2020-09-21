import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PrivacyagreementPage } from './privacyagreement.page';

describe('InvitestorePage', () => {
  let component: PrivacyagreementPage;
  let fixture: ComponentFixture<PrivacyagreementPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrivacyagreementPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PrivacyagreementPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
