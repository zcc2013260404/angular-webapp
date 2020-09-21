import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreatelivePage } from './createlive.page';

describe('CreatelivePage', () => {
  let component: CreatelivePage;
  let fixture: ComponentFixture<CreatelivePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatelivePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreatelivePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
