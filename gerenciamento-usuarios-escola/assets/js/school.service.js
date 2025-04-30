window.app.factory('UsuarioService', function() {
    const STORAGE_KEY = 'escola_usuarios';
    
    const generateId = () => Date.now().toString(36) + Math.random().toString(36).substr(2, 9);

    const loadUsuarios = () => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) return JSON.parse(stored);
        
        return [
            { id: generateId(), nome: "João Silva", tipo: "Aluno", dataCadastro: new Date(2023, 0, 15).toISOString() },
            { id: generateId(), nome: "Maria Santos", tipo: "Professor", dataCadastro: new Date(2022, 5, 20).toISOString() },
            { id: generateId(), nome: "Carlos Oliveira", tipo: "Aluno", dataCadastro: new Date(2023, 2, 10).toISOString() },
            { id: generateId(), nome: "Ana Pereira", tipo: "Professor", dataCadastro: new Date(2022, 8, 5).toISOString() },
            { id: generateId(), nome: "Pedro Costa", tipo: "Aluno", dataCadastro: new Date(2023, 1, 28).toISOString() }
        ];
    };

    const saveUsuarios = (data) => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
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
            const novoUsuario = {
                ...usuario,
                id: generateId(),
                dataCadastro: new Date().toISOString()
            };
            usuarios.push(novoUsuario);
            saveUsuarios(usuarios);
            return novoUsuario;
        },

        remover: function(id) {
            usuarios = usuarios.filter(u => u.id !== id);
            saveUsuarios(usuarios);
        },

        filtrar: function(filtroNome, filtroTipo) {
            return usuarios.filter(u => {
                const nomeMatch = u.nome.toLowerCase().includes(filtroNome.toLowerCase());
                const tipoMatch = !filtroTipo || u.tipo === filtroTipo;
                return nomeMatch && tipoMatch;
            });
        }
    };
});