import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CpuTurnPage } from './cpu-turn.page';

describe('CpuTurnPage', () => {
  let component: CpuTurnPage;
  let fixture: ComponentFixture<CpuTurnPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CpuTurnPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CpuTurnPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
