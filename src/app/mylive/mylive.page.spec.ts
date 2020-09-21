import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MylivePage } from './mylive.page';

describe('MylivePage', () => {
  let component: MylivePage;
  let fixture: ComponentFixture<MylivePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MylivePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MylivePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
