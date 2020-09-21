import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InvitestorePage } from './invitestore.page';

describe('InvitestorePage', () => {
  let component: InvitestorePage;
  let fixture: ComponentFixture<InvitestorePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvitestorePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InvitestorePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
