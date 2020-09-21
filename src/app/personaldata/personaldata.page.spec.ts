import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PersonaldataPage } from './personaldata.page';

describe('PersonaldataPage', () => {
  let component: PersonaldataPage;
  let fixture: ComponentFixture<PersonaldataPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonaldataPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PersonaldataPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
