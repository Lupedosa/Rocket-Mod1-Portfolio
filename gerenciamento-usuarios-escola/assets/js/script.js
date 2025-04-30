const app = angular.module('taskModule', []);

app.service('UsuarioService', function() {
    const usuarios = [
        { nome: "João Silva", tipo: "Aluno", dataCadastro: new Date(2023, 0, 15) },
        { nome: "Maria Santos", tipo: "Professor", dataCadastro: new Date(2022, 5, 20) },
        { nome: "Carlos Oliveira", tipo: "Aluno", dataCadastro: new Date(2023, 2, 10) },
        { nome: "Ana Pereira", tipo: "Professor", dataCadastro: new Date(2022, 8, 5) },
        { nome: "Pedro Costa", tipo: "Aluno", dataCadastro: new Date(2023, 1, 28) }
    ];

    this.listar = function() {
        return usuarios;
    };

    this.adicionar = function(usuario) {
        usuario.dataCadastro = new Date();
        usuarios.push(usuario);
    };

    this.remover = function(index) {
        usuarios.splice(index, 1);
    };
});

app.controller('AppController', function($scope, UsuarioService) {
    $scope.mensagem = "Bem-vindo ao sistema de cadastro escolar";
    $scope.usuarios = UsuarioService.listar();
    $scope.filtro = '';
    $scope.filtroTipo = '';
    $scope.showForm = false;
    
    $scope.novoUsuario = {
        nome: '',
        tipo: 'Aluno',
    };
    
    $scope.adicionarUsuario = function() {
        UsuarioService.adicionar(angular.copy($scope.novoUsuario));
        $scope.novoUsuario = {
            nome: '',
            tipo: 'Aluno',
        };
        $scope.showForm = false;
    };
    
    $scope.removerUsuario = function(index) {
        UsuarioService.remover(index);
    };
});

app.controller('UserListController', function($scope) {
});