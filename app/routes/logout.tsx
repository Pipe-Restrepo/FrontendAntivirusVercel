import { redirect } from "@remix-run/node";
import { tokenCookie } from "~/utils/cookies";
export const action = async () => {
    return redirect("/login", {
        headers: {
            "Set-Cookie": await tokenCookie.serialize("", { maxAge: 0 }),
        },
    });
}