# ng-components-queue
[![npm version](https://badge.fury.io/js/ng-components-queue.svg)](https://badge.fury.io/js/ng-compile-component) ![dependencies](https://david-dm.org/rickhub/ng-components-queue.svg)
> AngularJS components-queue with promise-support. Great for building stacked modal dialogs.

This component allows you to stack components inside of a queue. Every component gets passed a promise which, whenever its resolved / rejected, will remove the component from the queue. If the parent scope is destroyed, the child-components can be removed from the queue automatically. This is great when building complex applications with stacked modal dialogs.

---

### Install (npm)
```shell
npm i ng-components-queue
```

---

### Include `module.js`
```html
<script src='./node_modules/ng-components-queue/module.js'></script>
```

### Include `ng-compile-component` (dependency)
```html
<script src='./node_modules/ng-compile-component/src/ng-compile-component.js'></script>
```

### Include `ng-components-queue.js` and `ng-components-host`
```html
<script src='./node_modules/ng-components-queue/src/ng-components-queue.js'></script>
<script src='./node_modules/ng-components-queue/src/ng-components-host.js'></script>
```

### Add the dependency
```javascript
angular.module('app', ['rckd.utils']);
```
Now you are ready to rumble!

---
# Usage
Check this [fiddle](https://jsfiddle.net/rckd/tg1dxdtg/) for a simple dialog-example.