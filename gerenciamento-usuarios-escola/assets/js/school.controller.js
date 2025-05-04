window.app.controller('AppController', ['$scope', 'UsuarioService', '$timeout', 
    function($scope, UsuarioService, $timeout) {
        $scope.mensagem = "Bem-vindo ao sistema de cadastro escolar";
        $scope.usuarios = UsuarioService.listar();
        $scope.filtro = '';
        $scope.filtroTipo = '';
        $scope.showForm = false;
        $scope.isSaving = false;
        $scope.saveSuccess = false;
        
        $scope.totalAlunos = UsuarioService.filtrar('', 'Aluno').length;
        $scope.totalProfessores = UsuarioService.filtrar('', 'Professor').length;
        
        $scope.novoUsuario = {
            nome: '',
            email: '',
            tipo: 'Aluno'
        };
    
        $scope.adicionarUsuario = function(form) {
            if (form.$invalid) return;
            
            $scope.isSaving = true;
            $scope.saveSuccess = false;
            
            UsuarioService.salvar(angular.copy($scope.novoUsuario))
                .then(function(usuarioSalvo) {
                    $scope.usuarios = UsuarioService.filtrar($scope.filtro, $scope.filtroTipo);
                    $scope.totalAlunos = UsuarioService.filtrar('', 'Aluno').length;
                    $scope.totalProfessores = UsuarioService.filtrar('', 'Professor').length;
                    $scope.saveSuccess = true;
                    $timeout(function() {
                        $scope.showForm = false;
                        $scope.novoUsuario = { nome: '', email: '', tipo: 'Aluno' };
                        form.$setPristine();
                        form.$setUntouched();
                        $scope.saveSuccess = false;
                    }, 1500);
                })
                .finally(function() {
                    $scope.isSaving = false;
                });
        };
    
        $scope.removerUsuario = function(id) {
            UsuarioService.remover(id);
            $scope.usuarios = UsuarioService.filtrar($scope.filtro, $scope.filtroTipo);
            $scope.totalAlunos = UsuarioService.filtrar('', 'Aluno').length;
            $scope.totalProfessores = UsuarioService.filtrar('', 'Professor').length;
        };
    
        $scope.$watchGroup(['filtro', 'filtroTipo'], function(newValues, oldValues) {
            if (newValues !== oldValues) {
                $scope.usuarios = UsuarioService.filtrar($scope.filtro, $scope.filtroTipo);
            }
        });
    }]);