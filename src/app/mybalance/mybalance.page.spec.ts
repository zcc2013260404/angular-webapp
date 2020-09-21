import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MybalancePage } from './mybalance.page';

describe('MybalancePage', () => {
  let component: MybalancePage;
  let fixture: ComponentFixture<MybalancePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MybalancePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MybalancePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
