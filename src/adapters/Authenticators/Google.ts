import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { firebaseAuth } from "../../libs/firebaseLib";

export class GoogleAuthenticator {
    async getUserInfo() {
        const googleAuthProvider = new GoogleAuthProvider();
        const userInfo = await signInWithPopup(firebaseAuth, googleAuthProvider);

        return userInfo;
    }
}