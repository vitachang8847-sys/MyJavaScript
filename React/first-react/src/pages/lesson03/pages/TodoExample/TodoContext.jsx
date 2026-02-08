const TodoStateContext = createContext(null);
const TodoDispatchContext = createContext(null);

export function TodoContext({ children }) {
  const [todoList, dispatch] = useReducer(todoReducer, initState);

  const handles = {
    add: (text) => dispatch(addTodo(text)),
    delete: (id) => dispatch(deleteTodo(id)),
    toggle: (id) => dispatch(toggleChecked(id)),
  };
  
  return (
    <TodoStateContext.Provider value={todoList}>
      <TodoDispatchContext.Provider value={{ ...handles }}>
        {children}
      </TodoDispatchContext.Provider>
    </TodoStateContext.Provider>
    );
}
