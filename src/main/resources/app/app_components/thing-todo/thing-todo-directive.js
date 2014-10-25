/**
 * Created by jhas on 2014-09-23.
 */
(function(){
    var app = angular.module('noteApp.directive.thing.todo', ['mgcrea.ngStrap', 'noteApp.filters']);
        /*
        * As a User I want to see the choosen text object
        * As a User I want to be able to edit the object
        * As a User I want to be able to delete the object
        * */
    app.directive('showTodoThing', function showTodoThing(){
        return{
            restrict: 'E',
            scope: {
                thing: '=',
                removeFn: '&',
                saveFn: '&',
                showMenu: '@'
            },
            controller: function showTodoThingCtrl($scope, $log){

                var remove = function(){
                    var id = $scope.thing.id;
                    $scope.removeFn({id: id});
                };

                $scope.deletePopover = {
                    url: '/app_components/thing-todo/popover/delete-popover.html',
                    data: {
                        title: 'Delete',
                        name: $scope.thing.name,
                        call: function () {
                            remove();
                        }
                    }
                };
                $scope.editAside = {
                    url: '/app_components/thing-todo/aside/edit-todo-aside.tpl.html',
                    data: {
                        thing: angular.copy($scope.thing),
                        call: function(updatedThing){
                            save(updatedThing);
                        }
                    }
                };

                $scope.progressStyle = function(){
                    var widthStyle = $scope.thing.status + '%';
                    var style = {width: widthStyle};
                    return style;
                };

                var save = function(updatedThing){
                    $scope.saveFn({thing: updatedThing});
                };
            },
            templateUrl: '/app_components/thing-todo/show-todo.tpl.html'

        };
    });
    app.directive('editableTodoThing', function editableTodoThing(){
        return{
            restrict: 'E',
            scope: {
                thing: '='
            },
            controller: function editableTextThingCtrl($scope){

            },
            templateUrl: '/app_components/thing-todo/edit-todo.tpl.html'
        };
    });
    app.directive('createTodoThing', function createTodoThing(){
        return{
            restrict: 'E',
            scope: {
                saveFn: '&',
                cancelFn: '&?'
            },
            controller: function createTodoThingCtrl($scope){
                var init = function(){
                    $scope.thing = {
                        type: 'TODO'
                    };
                };

                $scope.save = function(){
                    $scope.saveFn({thing: $scope.thing});
                };

                $scope.cancel =function(){
                    init();
                    $scope.cancelFn();
                };

                init();
            },
            templateUrl: '/app_components/thing-todo/create-todo-tpl.html'
        };
    });
})();