        class User {
            constructor(name, email, password) {
                this.name = name
                this.email = email
                this.password = password
            }
    
            exibirPerfil() {
                console.log(`Nome: ${this.name} | Email: ${this.email}`)
            }
    
            login(email, password) {
                return this.email === email && this.password === password
            }
    
            get name() { return this._name }
            set name(name) { this._name = name }
    
            get email() { return this._email }
            set email(email) { this._email = email }
    
            get password() { return this._password }
            set password(password) { this._password = password }
        }
    
        class Studant extends User {
            constructor(name, email, password, turma) {
                super(name, email, password)
                this.turma = turma
            }

            exibirPerfil(){
                super.exibirPerfil();
                console.log(`Turma: ${this.turma}`)
            }
    
            get turma() { return this._turma }
            set turma(turma) { this._turma = turma }
        }
    
        class Teacher extends User {
            constructor(name, email, password, materias) {
                super(name, email, password)
                this.materias = materias
            }

            exibirPerfil(){
                super.exibirPerfil();
                console.log(`Matéria(s): ${this.materias}`)
            }
    
            get materias() { return this._materias }
            set materias(materias) { this._materias = materias }
        }
    
        const studants = [
            new Studant("João", "joao@gmail.com", "Banana123", "A1"),
            new Studant("Mariana", "mariana@hotmail.com", "Senha123", "B2"),
            new Studant("Carlos", "carlos@gmail.com", "abc456", "C3"),
            new Studant("Fernanda", "fernanda@hotmail.com", "123abc", "A2"),
            new Studant("Lucas", "lucas@gmail.com", "pass123", "B1")
        ];
    
        const teachers = [
            new Teacher("Luan", "luan@escola.com", "abc123", ["Matemática"]),
            new Teacher("Camila", "camila@escola.com", "senha456", ["Português"]),
            new Teacher("Roberto", "roberto@escola.com", "pass789", ["História", "Geografia"])
        ];
    
        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');
        const loginButton = document.querySelector('button[type="submit"]');
        const alertBox = document.querySelector('.alert');
    
        loginButton.addEventListener('click', (event) => {
            event.preventDefault();
    
            const email = emailInput.value.trim();
            const password = passwordInput.value.trim();
    
            let usuarioLogado = null;
    
            for (const aluno of studants) {
                if (aluno.login(email, password)) {
                    usuarioLogado = aluno;
                    break;
                }
            }
    
            if (!usuarioLogado) {
                for (const prof of teachers) {
                    if (prof.login(email, password)) {
                        usuarioLogado = prof;
                        break;
                    }
                }
            }
    
            if (usuarioLogado) {
                localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado));
                window.location.href = 'login-sucesso.html';
            } else {
                alertBox.classList.remove('d-none');
            }
        });
    
        
        console.log("=== Alunos ===");
        studants.forEach(aluno => aluno.exibirPerfil());
    
        console.log("=== Professores ===");
        teachers.forEach(prof => prof.exibirPerfil());
