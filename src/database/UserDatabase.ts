import { UserDB } from "../models/User"
import { BaseDataBase } from "./BaseDatabase"

export class UserDataBase extends BaseDataBase{

    public static TABLE_USERS = "users"

public async findByEmail(
    email:string
): Promise<UserDB | undefined>{
    const [userDB]:UserDB[] | undefined[] = await BaseDataBase
    .connection(UserDataBase.TABLE_USERS)
    .where({email})

    return userDB   
}
public async findById(id: string): Promise<any> {
    return await BaseDataBase.connection(UserDataBase.TABLE_USERS).where({ id })
}
public async insertUser(
    newUserDB: UserDB
): Promise<void> {
    await BaseDataBase
    .connection(UserDataBase.TABLE_USERS)
    .insert(newUserDB)
}
public findUsers = async (q:string):Promise<UserDB[]> =>{
    let resultDB: UserDB[]
    if(q){
      resultDB = await BaseDataBase
      .connection(UserDataBase.TABLE_USERS).where("name", "like", `%${q}%`)
    } else {
      resultDB = await BaseDataBase
      .connection(UserDataBase.TABLE_USERS)
    }
        
    return resultDB
  }   
}