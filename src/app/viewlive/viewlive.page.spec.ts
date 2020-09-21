import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewlivePage } from './viewlive.page';

describe('ViewlivePage', () => {
  let component: ViewlivePage;
  let fixture: ComponentFixture<ViewlivePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewlivePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewlivePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
