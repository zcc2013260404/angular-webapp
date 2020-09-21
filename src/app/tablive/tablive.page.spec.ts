import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TablivePage } from './tablive.page';

describe('TablivePage', () => {
  let component: TablivePage;
  let fixture: ComponentFixture<TablivePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablivePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TablivePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
