import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MysettingPage } from './mysetting.page';

describe('MysettingPage', () => {
  let component: MysettingPage;
  let fixture: ComponentFixture<MysettingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MysettingPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MysettingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
