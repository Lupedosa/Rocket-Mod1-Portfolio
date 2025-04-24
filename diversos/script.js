class Pessoa {
    _name
    _email
    _birthday
    _password
    _age

    constructor(name, email, birthday, password, age,){
        this.setName(name)
        this._email = email
        this.setBirthday(birthday)
        this._password = password
    }
    
    getName(){
        return this._name;
    }
    
    setName(name){
        this._name = name;
    }
    
    getBirthday(){
        return new Date(this._birthday);
    }
    setBirthday(birthday){
        this._birthday = birthday
        this._age = Math.floor((new Date().getTime() - new Date(birthday).getTime())/1000/60/60/24/365);
    }
}

const pessoa = new Pessoa(
    "Felipe",
    "blablabla@gmail.com",
    "2002-05-02",
    "abc123",

)

console.log(pessoa)