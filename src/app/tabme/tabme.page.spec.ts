import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TabmePage } from './tabme.page';

describe('TabmePage', () => {
  let component: TabmePage;
  let fixture: ComponentFixture<TabmePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabmePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TabmePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
