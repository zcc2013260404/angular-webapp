import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OrderinfoPage } from './orderinfo.page';

describe('OrderinfoPage', () => {
  let component: OrderinfoPage;
  let fixture: ComponentFixture<OrderinfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderinfoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OrderinfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
