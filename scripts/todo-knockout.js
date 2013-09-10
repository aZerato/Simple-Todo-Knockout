$(document).ready(function() {

	function Todo(id, content, state) {
		var self = this;
		self.id = id;
		self.content = content;
		self.state = state;
	}

	function TodoViewModel() {
		var self = this;

		self.todos = ko.observableArray();

		self.addTodo = function () {
			self.todos.push(
				new Todo(
					self.todos().length == 0 ? 1 : self.todos()[self.todos().length-1].id+1,
					"content",
					ko.observable(false)
				)
			);
		};

		self.removeTodo = function (todo) {
			self.todos.remove(todo);
		};

		self.loadTodos = function() {
			var ltodos = localStorage.getItem("todos");
			if(ltodos == null) {
				alert('Nothing in the localStorage !');
				return;
			}
			self.todos(JSON.parse(ltodos));
		};

		self.saveTodos = function() {
			localStorage.setItem("todos", ko.toJSON(self.todos()));
		};

		self.clearTodos = function() {
			localStorage.clear();
		};
	}

	ko.applyBindings(new TodoViewModel());

});