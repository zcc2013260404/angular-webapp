import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GoodtypelistPage } from './goodtypelist.page';

describe('GoodtypelistPage', () => {
  let component: GoodtypelistPage;
  let fixture: ComponentFixture<GoodtypelistPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoodtypelistPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GoodtypelistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
