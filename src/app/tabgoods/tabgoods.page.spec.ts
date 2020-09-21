import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TabgoodsPage } from './tabgoods.page';

describe('TabgoodsPage', () => {
  let component: TabgoodsPage;
  let fixture: ComponentFixture<TabgoodsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabgoodsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TabgoodsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
