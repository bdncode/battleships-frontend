import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PlayerTurnPage } from './player-turn.page';

describe('PlayerTurnPage', () => {
  let component: PlayerTurnPage;
  let fixture: ComponentFixture<PlayerTurnPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerTurnPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PlayerTurnPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
