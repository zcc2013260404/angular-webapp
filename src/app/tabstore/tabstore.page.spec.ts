import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TabstorePage } from './tabstore.page';

describe('TabstorePage', () => {
  let component: TabstorePage;
  let fixture: ComponentFixture<TabstorePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabstorePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TabstorePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
