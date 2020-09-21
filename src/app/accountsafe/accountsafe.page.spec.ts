import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AccountsafePage } from './accountsafe.page';

describe('AccountsafePage', () => {
  let component: AccountsafePage;
  let fixture: ComponentFixture<AccountsafePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountsafePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AccountsafePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
