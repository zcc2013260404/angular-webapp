import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MyadvancelivePage } from './myadvancelive.page';

describe('MyadvancelivePage', () => {
  let component: MyadvancelivePage;
  let fixture: ComponentFixture<MyadvancelivePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyadvancelivePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MyadvancelivePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
