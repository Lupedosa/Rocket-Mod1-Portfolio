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
            if (!$scope.novoUsuario.nome) return;
            
            UsuarioService.adicionar(angular.copy($scope.novoUsuario));
            $scope.novoUsuario = { nome: '', tipo: 'Aluno' };
            $scope.showForm = false;
            $scope.atualizarLista();
        };
    
        $scope.removerUsuario = function(id) {
            UsuarioService.remover(id);
            $scope.atualizarLista();
        };
    
        $scope.atualizarLista = function() {
            if ($scope.filtro || $scope.filtroTipo) {
                $scope.usuarios = UsuarioService.filtrar($scope.filtro, $scope.filtroTipo);
            } else {
                $scope.usuarios = UsuarioService.listar();
            }
        };
    
        $scope.$watchGroup(['filtro', 'filtroTipo'], function() {
            $scope.atualizarLista();
        });
    }]);
    
    window.app.controller('UserListController', ['$scope', function($scope) {}]);