import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GoodstypePage } from './goodstype.page';

describe('GoodstypePage', () => {
  let component: GoodstypePage;
  let fixture: ComponentFixture<GoodstypePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoodstypePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GoodstypePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
