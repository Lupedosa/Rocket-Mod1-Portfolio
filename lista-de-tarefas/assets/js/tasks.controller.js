app.controller('TaskController', function ($scope, TaskService) {
    $scope.modalActive = false;
    $scope.showCompletedOnly = false;
    $scope.showIncompletedOnly = false;
    $scope.showTodayOnly = false;
    $scope.today = new Date().toLocaleDateString();
    $scope.tasks = TaskService.getTasks();
    //$scope.tasks = 
    $scope.taskInput = {
        title: "",
        date: "",
    };

    $scope.toggleModal = () => {
        $scope.modalActive = !$scope.modalActive;
    };

    $scope.handleSubmitAddTask = () => {

        const title = $scope.taskInput.title;
        const date = $scope.taskInput.date;
        if (!title || !date) return;

        TaskService.addTask(title, date);

        $scope.toggleModal();
        $scope.taskInput.title = "";
        $scope.taskInput.date = "";
    };

    $scope.toggleCheckedTask = () => {
        TaskService.toggleCheck();
        $scope.tasks = TaskService.getTasks();
    };
        
    $scope.deleteTask = (currentTask) => {
        TaskService.removeTask(currentTask.id);
        $scope.tasks = TaskService.getTasks();
    };

    $scope.validate = (error, touched) =>{
        if(!touched) {
            return {}
        }
        const values = Object.values(error);
        if (values.length === 0) {
            return {}
        }
        const isTrue = values.reduce((acc, cur) => acc && cur, true);

        if (isTrue) {
            console.log({ "border-color": "red"});
            return { "border-color": "red"};
        };
    };

    $scope.validateForm = (form) => {
        console.log(form)
    }

});
