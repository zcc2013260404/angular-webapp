import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GoodinfoPage } from './goodinfo.page';

describe('GoodinfoPage', () => {
  let component: GoodinfoPage;
  let fixture: ComponentFixture<GoodinfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoodinfoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GoodinfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
