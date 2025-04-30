window.app.factory('UsuarioService', function() {
    const STORAGE_KEY = 'escola_usuarios';
    
    const loadUsuarios = () => {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : [
            { nome: "João Silva", tipo: "Aluno", dataCadastro: new Date(2023, 0, 15).toISOString() },
            { nome: "Maria Santos", tipo: "Professor", dataCadastro: new Date(2022, 5, 20).toISOString() },
            { nome: "Carlos Oliveira", tipo: "Aluno", dataCadastro: new Date(2023, 2, 10).toISOString() },
            { nome: "Ana Pereira", tipo: "Professor", dataCadastro: new Date(2022, 8, 5).toISOString() },
            { nome: "Pedro Costa", tipo: "Aluno", dataCadastro: new Date(2023, 1, 28).toISOString() }
        ];
    };

    const saveUsuarios = (usuarios) => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(usuarios));
    };

    let usuarios = loadUsuarios();

    return {
        listar: function() {
            return usuarios.map(u => ({
                ...u,
                dataCadastro: new Date(u.dataCadastro)
            }));
        },
        adicionar: function(usuario) {
            usuario.dataCadastro = new Date().toISOString();
            usuarios.push(usuario);
            saveUsuarios(usuarios);
        },
        remover: function(index) {
            usuarios.splice(index, 1);
            saveUsuarios(usuarios);
        },
        filtrar: function(filtro, tipo) {
            return usuarios.filter(u => {
                const matchesNome = u.nome.toLowerCase().includes(filtro.toLowerCase());
                const matchesTipo = !tipo || u.tipo === tipo;
                return matchesNome && matchesTipo;
            });
        }
    };
});