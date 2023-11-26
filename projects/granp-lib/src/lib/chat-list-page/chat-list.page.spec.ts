import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatListPageComponent } from './chat-list.page';

describe('ChatListPageComponent', () => {
  let component: ChatListPageComponent;
  let fixture: ComponentFixture<ChatListPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChatListPageComponent]
    });
    fixture = TestBed.createComponent(ChatListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
