angular.module('rckd.utils').component('ngComponentsHost', {
	template: `
		<ng-compile-component
			ng-repeat='component in $ctrl.queue.components'
			component='component.name'
			bindings='component.bindings'
		></ng-compile-component>
	`,
	bindings:{
		queue: '='
	}
});