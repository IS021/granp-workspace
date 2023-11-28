import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatPage } from './chat.page';

describe('ChatPageComponent', () => {
  let component: ChatPage;
  let fixture: ComponentFixture<ChatPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ChatPage]
    });
    fixture = TestBed.createComponent(ChatPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
