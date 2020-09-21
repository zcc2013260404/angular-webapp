import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OrdertabsPage } from './ordertabs.page';

describe('OrdertabsPage', () => {
  let component: OrdertabsPage;
  let fixture: ComponentFixture<OrdertabsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdertabsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OrdertabsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
