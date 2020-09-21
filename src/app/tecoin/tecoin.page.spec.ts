import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TecoinPage } from './tecoin.page';

describe('TecoinPage', () => {
  let component: TecoinPage;
  let fixture: ComponentFixture<TecoinPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TecoinPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TecoinPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
