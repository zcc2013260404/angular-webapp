import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GoodtmlistPage } from './goodtmlist.page';

describe('GoodtmlistPage', () => {
  let component: GoodtmlistPage;
  let fixture: ComponentFixture<GoodtmlistPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoodtmlistPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GoodtmlistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
