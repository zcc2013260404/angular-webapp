import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OrdercommitPage } from './ordercommit.page';

describe('OrdercommitPage', () => {
  let component: OrdercommitPage;
  let fixture: ComponentFixture<OrdercommitPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdercommitPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OrdercommitPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
