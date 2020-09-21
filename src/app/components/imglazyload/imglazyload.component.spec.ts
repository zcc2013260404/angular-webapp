import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ImglazyloadComponent } from './imglazyload.component';

describe('ImglazyloadComponent', () => {
  let component: ImglazyloadComponent;
  let fixture: ComponentFixture<ImglazyloadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImglazyloadComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ImglazyloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
