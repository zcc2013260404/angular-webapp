import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OrderlistinfoPage } from './orderlistinfo.page';

describe('OrderlistinfoPage', () => {
  let component: OrderlistinfoPage;
  let fixture: ComponentFixture<OrderlistinfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderlistinfoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OrderlistinfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
