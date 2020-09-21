import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SubscribelivePage } from './subscribelive.page';

describe('SubscribelivePage', () => {
  let component: SubscribelivePage;
  let fixture: ComponentFixture<SubscribelivePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubscribelivePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SubscribelivePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
