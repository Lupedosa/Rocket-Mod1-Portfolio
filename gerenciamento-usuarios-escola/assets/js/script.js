const app = angular.module('taskModule', []);

        app.controller('AppController', function ($scope) {
            $scope.mensagem = "Bem-vindo ao sistema de cadastro escolar";
            
            $scope.usuarios = [
                { nome: "João Silva", tipo: "Aluno", dataCadastro: new Date(2023, 0, 15) },
                { nome: "Maria Santos", tipo: "Professor", dataCadastro: new Date(2022, 5, 20) },
                { nome: "Carlos Oliveira", tipo: "Aluno", dataCadastro: new Date(2023, 2, 10) },
                { nome: "Ana Pereira", tipo: "Professor", dataCadastro: new Date(2022, 8, 5) },
                { nome: "Pedro Costa", tipo: "Aluno", dataCadastro: new Date(2023, 1, 28) }
            ];
            
            $scope.filtro = '';
            $scope.filtroTipo = '';
        });

        app.controller('UserListController', function ($scope) {
        });