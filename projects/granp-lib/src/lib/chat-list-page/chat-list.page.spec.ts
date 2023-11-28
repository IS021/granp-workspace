import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatListPage } from './chat-list.page';

describe('ChatListPageComponent', () => {
  let component: ChatListPage;
  let fixture: ComponentFixture<ChatListPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChatListPage]
    });
    fixture = TestBed.createComponent(ChatListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
