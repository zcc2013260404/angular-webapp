import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddresseditPage } from './addressedit.page';

describe('AddresseditPage', () => {
  let component: AddresseditPage;
  let fixture: ComponentFixture<AddresseditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddresseditPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddresseditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
