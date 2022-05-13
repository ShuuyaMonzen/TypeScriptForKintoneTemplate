class User {
    public age: number;
    public familyName: string;
    public givenName: string;
    constructor (familyName: string, givenName: string, age: number) {
        this.age = age;
        this.familyName = familyName;
        this.givenName = givenName;
    }
}

const user = new User('海老原', '賢次', 44); // 名前と年齢は適当に