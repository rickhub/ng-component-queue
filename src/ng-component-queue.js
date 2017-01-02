angular.module('rckd.utils').factory('ComponentsQueue', [
	'$q',
	function($q){

		/**
		 * ComponentsQueue constructor.
		 */
		function ComponentsQueue(){
			this.components = [];
			this.listeners = {};
		}

		/**
		 * Adds a listener to $destroy-event of the given scope. Once the event
		 * is triggered, all queued components will be removed from the queue.
		 * This will cause a rejection of the affected component's promise with
		 * a string-result '$destroy'.
		 * 
		 * @param {Object} scope
		 */
		ComponentsQueue.prototype.addListener = function(scope){
			if(this.listeners[scope.$id]){
				return;
			}
			this.listeners[scope.$id] = scope.$on('$destroy', function(){
				this.components = this.components.filter(function(component){
					if(component.scope === scope){
						component.bindings.defer.reject('$destroy');
					}
					return component.scope !== scope;
				});
				this.listeners[scope.$id]();
				delete this.listeners[scope.$id];
			}.bind(this));
		};

		/**
		 * This simply removes a component from the queue.
		 * 
		 * @param  {Object} component
		 * @return {void}
		 */
		ComponentsQueue.prototype.remove = function(component){
			var i;
			for(i=0; i<this.components.length; i++){
				if(this.components[i] === component){
					this.components.splice(i, 1);
				}
			}
		};

		/**
		 * Adds a component to the queue. A promise will be returned which,
		 * whenever its finished, will remove the component from the queue.
		 * Optionally the parent-scope can be passed. This will cause the
		 * component to be removed once the given scope triggers $destroy.
		 * If that happens, the affected component's promises will be rejected
		 * with a string-result '$destroy'.
		 * 
		 * @param  {String} name
		 * @param  {Object} bindings
		 * @param  {Object} scope
		 * @return {Promise}
		 */
		ComponentsQueue.prototype.push = function(name, bindings, scope){
			var defer = $q.defer();
			var component = {
				scope: scope,
				name: name,
				bindings: angular.extend(bindings, {
					defer: defer
				})
			};

			this.components.push(component);
			defer.promise.finally(function(){
				if(component.scope && !this.listeners[component.scope.$id]){
					return;
				}
				this.remove(component);
			}.bind(this));

			if(scope){
				this.addListener(scope);
			}

			return defer.promise;
		};

		return ComponentsQueue;
	}
]);