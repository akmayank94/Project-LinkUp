import { currentUser, auth } from "@clerk/nextjs/server"; //redirectToSignIn

import { db } from "@/lib/db";

export const initialProfile = async () => {
    const user = await currentUser();

    if(!user) {
        return auth().redirectToSignIn();
    }

    //finding existing profile with clerk id if there is one , return it . if isnt create one 
    const profile = await db.profile.findUnique({
        where:{
            userId: user.id
        }
    });

    if (profile) {
        return profile;
    }

    const newProfile = await db.profile.create({
        data:{
            userId: user.id,
            name: `${user.firstName} ${user.lastName}`,
            imageUrl: user.imageUrl,
            email: user.emailAddresses[0].emailAddress,
        }
    });

    return newProfile;
};