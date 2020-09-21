import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OrderAddresslistPage } from './orderaddresslist.page';

describe('AddresslistPage', () => {
  let component: OrderAddresslistPage;
  let fixture: ComponentFixture<OrderAddresslistPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderAddresslistPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OrderAddresslistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
