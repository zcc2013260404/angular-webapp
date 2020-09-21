import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StartlivePage } from './startlive.page';

describe('StartlivePage', () => {
  let component: StartlivePage;
  let fixture: ComponentFixture<StartlivePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartlivePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StartlivePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
