import { BaseDataBase } from "../../src/database/BaseDatabase";
import { USER_ROLES, UserDB } from "../../src/models/User";

const usersMock: UserDB[] = [
    {
      id: "id-mock-fulano",
      name: "Fulano",
      email: "fulano@email.com",
      password: "hash-mock-fulano", // key = "Fulano123@"
      created_at: new Date().toISOString(),
      role: USER_ROLES.NORMAL
    },
    {
      id: "id-mock-astrodev",
      name: "Astrodev",
      email: "astrodev@email.com",
      password: "hash-mock-astrodev", // key = "Astrodev99@"
      created_at: new Date().toISOString(),
      role: USER_ROLES.ADMIN
    },
  ]
  
  export class UserDataBaseMock extends BaseDataBase {
    public static TABLE_USERS = "users"
  
    public async findUsers(
      q: string | undefined
    ): Promise<UserDB[]> {
      if (q) {
        return usersMock.filter(user =>
            user.name.toLocaleLowerCase()
              .includes(q.toLocaleLowerCase()))
  
      } else {
        return usersMock
      }
    }
  
    public async findById(
      id: string
    ): Promise<UserDB | undefined> {
      return usersMock.filter(user => user.id === id)[0]
    }
  
    public async findByEmail(
      email: string
    ): Promise<UserDB | undefined> {
      return usersMock.filter(user => user.email === email)[0]
    }
  
    public async insertUser(
      newUserDB: UserDB
    ): Promise<void> {
  
    }
  }