import { useContext } from "react";
import UserContext from "../contexts/UserContext";
import PBClient from "./Pocketbase";
import { RecordModel } from "pocketbase";



class Posts {
    instance: Posts | null = null;

    constructor() {
        if (this.instance) return this.instance;
        this.instance = this;


    }

    static async createPost(body: string, images: object[], user: RecordModel) {

        await PBClient.pb.collection("post").create({
            body: body,
            likes: 0,
            dislikes: 0,
            comments: 0,
            user: user.id,
            isEdited: false
        }).then(async (response) => {
            for (let i = 0; i < images.length; i++) {
                await PBClient.pb.collection("post_images").create({
                    image: images[i],
                    post: response.id
                })
            }

            return true;
        }).catch(err => {
            console.error(err)
        })
    }
}


export default Posts;