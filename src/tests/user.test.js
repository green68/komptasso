import { User } from "../classes/User";

test('create user with empty string', () => {
    const user = new User('')
    
    expect(user.name).toBeNull()
    
})
test('create user with no value', () => {
    const user = new User()
    
    expect(user.name).toBeNull()

})
test('user create key not valid', () => {
    const user = new User('{"name": "mon nom", "years": [], "test": null}')

    expect(user.test).not.toBeUndefined()
    expect(user.test).toBeNull()
})
