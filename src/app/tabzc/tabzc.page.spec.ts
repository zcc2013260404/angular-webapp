import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TabzcPage } from './tabzc.page';

describe('TabzcPage', () => {
  let component: TabzcPage;
  let fixture: ComponentFixture<TabzcPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabzcPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TabzcPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
