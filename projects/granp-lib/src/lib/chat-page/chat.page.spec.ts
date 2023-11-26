import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatPageComponent } from './chat.page';

describe('ChatPageComponent', () => {
  let component: ChatPageComponent;
  let fixture: ComponentFixture<ChatPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ChatPageComponent]
    });
    fixture = TestBed.createComponent(ChatPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});