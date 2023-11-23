import { auth, firestore } from "@/config/firebase";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

interface ILogin {
  email?: string;
  password?: string;
}

const login = async ({ email, password }: ILogin) => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);

    return user;
  } catch (err) {
    throw new Error(err);
  }
};

const logout = async () => {
  try {
    await signOut(auth);
  } catch (err) {
    throw new Error(err);
  }
};

const getCurrentUser = async () => {
  try {
    console.log(auth.currentUser);
    //     return auth.currentUser;
    const userSnapshot = await getDocs(
      query(
        collection(firestore, "users"),
        where("userUID", "==", auth.currentUser.uid)
      )
    );

    const currentUser = userSnapshot.docs.map((docs) => {
      console.log(docs.data());
      return {
        ...docs.data(),
      };
    });

    return currentUser[0];
  } catch (err) {
    throw new Error(err);
  }
};

export { login, logout, getCurrentUser };
