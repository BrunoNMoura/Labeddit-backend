import { knex } from "knex";
import dotenv from "dotenv";
import { LikesDislikesDB, PostDB } from "../models/Post";
import { CommentDB } from "../models/Comments";

dotenv.config();

export abstract class BaseDataBase {

    protected static connection = knex({
        client: "sqlite3",
        connection: {
            filename: process.env.DB_FILE_PATH as string,
        },
        useNullAsDefault: true,
        pool: {
            min: 0,
            max: 1,
            afterCreate: (conn: any, cb: any) => {
                conn.run("PRAGMA foreign_keys = ON", cb);
            }
        }
    });

    public abstract TABLE_NAME: string;

    // Find Post
    public async findPost(id: string): Promise<PostDB[]> {
        const result: PostDB[] = await BaseDataBase.connection("posts").where({ id });
        return result;
    }

    // Find Comment
    public async findComment(id: string): Promise<CommentDB[]> {
        const result: CommentDB[] = await BaseDataBase.connection("comments").where({ id });
        return result;
    }

    // Find Like/Dislike details
    public findLikeDislike = async (actionId: string, userId: string): Promise<LikesDislikesDB> => {
        const [resultDB]: LikesDislikesDB[] = await BaseDataBase.connection("likes_dislikes")
            .where({ action_id: actionId })
            .andWhere({ user_id: userId });
        return resultDB;
    }
}
