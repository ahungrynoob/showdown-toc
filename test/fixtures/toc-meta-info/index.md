> 前段时间，编写自己博客项目的时候，需要有一个全局状态管理，感觉 redux 又太重了，就自己基于 hook 搞一个吧，懒得装 redux 了

🎉🎉🎉 本文简单介绍下原理，伸手党可直接食用：[use-root-reducer](https://github.com/ahungrynoob/use-root-reducer)

⚠️ 先说一个大前提： redux 已经有完善的社区，和很多的 middleware, hooks 并不是 redux 的替代品，在大型 webapp 的开发中，还是使用 redux 来管理比较好

## `useReducer`和`redux`的区别：

`useReducer`创造的`state`是基于各个组件的，组件与组件之间的 state 是独立的，无法共享，如果需要传递只能通过`props`或者`context`，所以，就像它的名字一样的，`useReducer`就是方便开发者去使用自己的`reducer`来管理组件级别的`state`。

`redux`则可以独立于组件之外，创造一个全局的状态管理，这个全局的状态可以和各个组件通过`mapStateToProps`和`mapDispatchToProps`来通信。

## 思路：

知道区别之后，就会有一个想法：如何基于 hooks 的特性来创造一个简洁的全局状态，并且各个子组件可以触达到这个状态呢？嗯。。在根组件建立一个全局 state 和各个 dispatch 的收口，然后通过 react context 来将全局的 state 和全局 dispatch 下发给各个子组件或许是不错的选择。

### 第一步，通过 useReducer 在根组件上创建 globalDispatch 和 globalState：

```jsx
// app.jsx
import React, { useReducer } from 'react';
import { addTodo, completeTodo, setVisibilityFilter } from '../actions';
import { visibilityFilter, todos } from './reducers';

function App() {
  const [filters, dispatchFilter] = useReducer(visibilityFilter, 'SHOW_ALL');
  const [todoList, dispatchTodos] = useReducer(todos, []);

  // 这里可以创建一个 global dispatch function 和 global state
  const globalDispatch = action => [dispatchFilter, dispatchTodos].forEach(fn => fn(action));
  const globalState = {
    filters,
    todoList,
  };

  return <div>...</div>;
}

export default App;
```

### 第二步： 创建 context 并在根组件上传入`globalState`和`globalDispatch`

这里的 context 的作用是能够让树上的任意位置的组件能通过`useContext`获取到`globalState`和`globalDispatch`函数

```jsx
// context.jsx
import React from 'react';

export const StateContext = React.createContext({});

export const DispatchContext = React.createContext(null);
```

```jsx
// app.jsx
import React, { useReducer } from 'react';
import { addTodo, completeTodo, setVisibilityFilter } from '../actions';
import { visibilityFilter, todos } from './reducers';

function App() {
  const [filters, dispatchFilter] = useReducer(visibilityFilter, 'SHOW_ALL');
  const [todoList, dispatchTodos] = useReducer(todos, []);

  // 这里可以创建一个 global dispatch function 和 global state
  const globalDispatch = action => [dispatchFilter, dispatchTodos].forEach(fn => fn(action));
  const globalState = {
    filters,
    todoList,
  };

  return (
    <DispatchContext.Provider value={globalDispatch}>
      <StateContext.Provider value={globalState}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
}

export default App;
```

### 在子组件中使用 globalState 和 globalDispatch：

然后通过`useContext`的 hook，我们就能在任意子组件中获取到`state`和`dispatch`了，相当于 redux 的`mapStateToProps`和`mapDispatchToProps`的作用

```jsx
import React from 'react';
import { completeTodo } from './actions';
import { StateContext, DispatchContext } from './context.js';

export default () => {
  const state = React.useContext(StateContext);
  const dispatch = React.useContext(DispatchContext);
  const { todoList } = state;
  return (
    <ul>
      {todoList.map(({ text, completed }, index) => {
        return (
          <li
            onClick={() => {
              dispatch(completeTodo(index));
            }}
            className={`${completed ? 'done' : 'todo'}`}
          >
            {text}
          </li>
        );
      })}
    </ul>
  );
};
```

### 总结和建议：

通过以上几步就能获得一个全局状态管理的功能，针对中小型网站，可以不再需要 redux。我已经封装了这个小工具，有完整的单元测试和覆盖率，且得益于 typescript 的高级类型，能够给出智能的 IDE 提示，详见[use-root-reducer](https://github.com/ahungrynoob/use-root-reducer)，欢迎 pr~
