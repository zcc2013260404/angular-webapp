import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DcouponPage } from './dcoupon.page';

describe('DcouponPage', () => {
  let component: DcouponPage;
  let fixture: ComponentFixture<DcouponPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DcouponPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DcouponPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
