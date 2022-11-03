---
title:内置Hook
date:2021-10-13
description:bbb
---


### useSelector

​	组件内部不能直接与store对话，`useSelector`接收一个selector参数, 在组件内部访问store

```jsx
const someState = useSelector(stateSelector);

//等同于
const someState = stateSelector(store.getState)
```

 

### useDispatch

```jsx
const dispatch = useDispatch();
dispatch(someAction);

//等同于
store.dispatch(someActi)
```

