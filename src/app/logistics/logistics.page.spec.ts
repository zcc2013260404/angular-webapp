import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LogisticsPage } from './logistics.page';

describe('LogisticsPage', () => {
  let component: LogisticsPage;
  let fixture: ComponentFixture<LogisticsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogisticsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LogisticsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
