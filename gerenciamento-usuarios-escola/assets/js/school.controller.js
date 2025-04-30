window.app.controller('AppController', ['$scope', 'UsuarioService', 
    function($scope, UsuarioService) {
        $scope.mensagem = "Bem-vindo ao sistema de cadastro escolar";
        $scope.usuarios = UsuarioService.listar();
        $scope.filtro = '';
        $scope.filtroTipo = '';
        $scope.showForm = false;
        
        $scope.novoUsuario = {
            nome: '',
            tipo: 'Aluno'
        };
        
        $scope.adicionarUsuario = function() {
            UsuarioService.adicionar(angular.copy($scope.novoUsuario));
            $scope.novoUsuario = {
                nome: '',
                tipo: 'Aluno'
            };
            $scope.showForm = false;
            $scope.usuarios = UsuarioService.listar();
        };
        
        $scope.removerUsuario = function(index) {
            UsuarioService.remover(index);
            $scope.usuarios = UsuarioService.listar();
        };
    
        $scope.$watchGroup(['filtro', 'filtroTipo'], function(newValues) {
            if (newValues[0] || newValues[1]) {
                $scope.usuarios = UsuarioService.filtrar(newValues[0], newValues[1]);
            } else {
                $scope.usuarios = UsuarioService.listar();
            }
        });
    }]);
    
    window.app.controller('UserListController', ['$scope', function($scope) {
    }]);