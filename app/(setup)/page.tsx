import { initialProfile } from "@/lib/initial-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { InitialModal } from "@/components/modals/initial-modal";

const SetupPage = async() => {
    const profile = await initialProfile();

    // server dhundna mil gya to redirect wrna create new 
    const server = await db.server.findFirst({
        where:{
            members:{
                some:{
                    profileId: profile.id
                }
            }
        }
    });

    if (server){
        return redirect(`/servers/${server.id}`);
    }

    return <InitialModal />;
}
 
export default SetupPage;