import { TodoProvider } from './context/TodoContext';
import { Header } from './components/Header';
import { AddTodoForm } from './components/AddTodoForm';
import { FilterBar } from './components/FilterBar';
import { TodoList } from './components/TodoList';

export default function App() {
  return (
    <TodoProvider>
      <div style={{ minHeight: '100vh', padding: '32px 16px' }}>
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <Header />
          <AddTodoForm />
          <FilterBar />
          <TodoList />
        </div>
      </div>
    </TodoProvider>
  );
}
