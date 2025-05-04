window.app.factory('UsuarioService', ['$q', '$timeout',
    function ($q, $timeout) {
        const STORAGE_KEY = 'escola_usuarios';

        const generateId = () => Date.now().toString(36) + Math.random().toString(36).substr(2, 9);

        const loadUsuarios = () => {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) return JSON.parse(stored);

            return [
                { id: generateId(), nome: "João Silva", email: "joao@escola.com", tipo: "Aluno", dataCadastro: new Date(2023, 0, 15).toISOString() },
                { id: generateId(), nome: "Maria Santos", email: "maria@escola.com", tipo: "Professor", dataCadastro: new Date(2022, 5, 20).toISOString() },
                { id: generateId(), nome: "Carlos Oliveira", email: "carlos@escola.com", tipo: "Aluno", dataCadastro: new Date(2023, 2, 10).toISOString() },
                { id: generateId(), nome: "Ana Pereira", email: "ana@escola.com", tipo: "Professor", dataCadastro: new Date(2022, 8, 5).toISOString() },
                { id: generateId(), nome: "Pedro Costa", email: "pedro@escola.com", tipo: "Aluno", dataCadastro: new Date(2023, 1, 28).toISOString() }
            ];
        };

        const saveUsuarios = (data) => {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        };

        let usuarios = loadUsuarios();

        return {
            listar: function () {
                return usuarios.map(u => ({
                    ...u,
                    dataCadastro: new Date(u.dataCadastro)
                }));
            },

            salvar: function (usuario) {
                const deferred = $q.defer();

                $timeout(function () {
                    try {
                        const novoUsuario = {
                            ...usuario,
                            id: generateId(),
                            dataCadastro: new Date().toISOString()
                        };
                        usuarios.push(novoUsuario);
                        saveUsuarios(usuarios);
                        deferred.resolve(novoUsuario);
                    } catch (error) {
                        deferred.reject(error);
                    }
                }, 1500);

                return deferred.promise;
            },

            remover: function (id) {
                usuarios = usuarios.filter(u => u.id !== id);
                saveUsuarios(usuarios);
                return this.listar();
            },

            filtrar: function (filtroNome = '', filtroTipo = '') {
                const lista = this.listar();
                return lista.filter(u => {
                    const nomeMatch = u.nome.toLowerCase().includes(filtroNome.toLowerCase());
                    const tipoMatch = !filtroTipo || u.tipo === filtroTipo;
                    return nomeMatch && tipoMatch;
                });
            },

            // Nova função para contar usuários por tipo
            contarPorTipo: function (tipo) {
                return this.filtrar('', tipo).length;
            }
        };
    }]);
