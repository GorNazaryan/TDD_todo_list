import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let componentInstance: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    componentInstance = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(componentInstance).toBeTruthy();
  });

  it('should render todos by data count', () => {
    const todos = componentInstance.todos();
    const todosTemplates = fixture.nativeElement.querySelectorAll('.todo');
    expect(todosTemplates.length).toBe(todos.length);
  });

  it('add button should have disabled attr if input is empty', () => {
    const btn = fixture.debugElement.query(By.css('#addTodoBtn'));
    expect(btn.nativeElement.disabled).toBeTrue();
  });

  it('should dispatch createTodo action with input value after add button click', () => {
    const dispatchSpy = spyOn(componentInstance.store, 'dispatch');
    const inputValue = componentInstance.todoInput();
    const btn = fixture.debugElement.query(By.css('#addTodoBtn'));
    btn.triggerEventHandler('click');
    expect(dispatchSpy).toHaveBeenCalledWith({type: 'createTodo', payload: inputValue});
  });

  it('should dispatch deleteTodo action with todoId after delete button click', () => {
    const dispatchSpy = spyOn(componentInstance.store, 'dispatch');
    const selectedTodo = componentInstance.todos()[0];
    const btn = fixture.debugElement.query(By.css(`#deleteTodoBtn-${selectedTodo.id}`));
    btn.triggerEventHandler('click');
    expect(dispatchSpy).toHaveBeenCalledWith({type: 'deleteTodo', payload: selectedTodo.id});
  });

  it('should dispatch toggleMarkAsCompleteTodo action after markAsComplete checkbox click', () => {
    const dispatchSpy = spyOn(componentInstance.store, 'dispatch');
    const selectedTodo = componentInstance.todos()[0];
    const checkbox = fixture.debugElement.query(By.css(`#markAsComplete-${selectedTodo.id}`));
    const checked = checkbox.nativeElement.checked;
    expect(dispatchSpy).toHaveBeenCalledWith({
      type: 'toggleMarkAsCompleteTodo',
      payload: {id: selectedTodo.id, isCompleted: !checked},
    });
  });
});
