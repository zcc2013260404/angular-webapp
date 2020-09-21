import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NameauthPage } from './nameauth.page';

describe('NameauthPage', () => {
  let component: NameauthPage;
  let fixture: ComponentFixture<NameauthPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NameauthPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NameauthPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
