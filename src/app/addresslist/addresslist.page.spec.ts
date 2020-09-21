import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddresslistPage } from './addresslist.page';

describe('AddresslistPage', () => {
  let component: AddresslistPage;
  let fixture: ComponentFixture<AddresslistPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddresslistPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddresslistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
