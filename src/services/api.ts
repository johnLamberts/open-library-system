import { firestore } from "@/config/firebase";
import {
  IAcademicCourse,
  IAuthors,
  IEducationalStage,
  IGenres,
  IGradeLevel,
  IItemTypes,
  IUserRole,
} from "@/types";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where,
  writeBatch,
} from "firebase/firestore";

const CATEGORY = "category";
const AUTHORS = "authors";
const GENRES = "genres";
const CATALOGUE = "catalogue";
const USER_ROLE = "user-role";
const USERS = "users";
const EDUCATIONAL_STAGE = "educational-stages";
const GRADE_LEVEL = "grade-level";
const ACADEMIC_COURSE = "academic-course";

// =========== CATEGORY ================

const addCategory = async (payload: Partial<IItemTypes>) => {
  try {
    const querySnapshot = await getDocs(
      query(
        collection(firestore, CATEGORY),
        where("itemType", "==", payload.itemType)
      )
    );

    if (querySnapshot.size) {
      throw new Error("Category were already exists.");
    } else {
      await addDoc(collection(firestore, CATEGORY), {
        ...payload,
        isArchived: false,
        createdAt: serverTimestamp(),
      });
    }
  } catch (err) {
    throw new Error(`${err}`);
  }
};

const getCategory = async () => {
  try {
    const querySnapshot = await getDocs(collection(firestore, CATEGORY));

    return querySnapshot.docs.map((doc) => {
      return {
        ...doc.data(),
        id: doc.id,
      };
    });
  } catch (err) {
    throw new Error(`${err}`);
  }
};

const updateCategory = async (
  payload: Partial<IItemTypes>,
  docId: string,
  itemToBeUpdate?: string
) => {
  try {
    await updateDoc(doc(firestore, CATEGORY, docId), {
      ...payload,
      updatedAt: serverTimestamp(),
    });

    const batch = writeBatch(firestore);

    const querySnapshot = await getDocs(
      query(
        collection(firestore, CATALOGUE),
        where("itemType", "==", itemToBeUpdate)
      )
    );
    console.log(itemToBeUpdate, payload.itemType);
    querySnapshot.docs.map((data) => {
      console.log(data.data());
      batch.update(data.ref, { itemType: payload.itemType });
    });

    await batch.commit();
  } catch (err) {
    throw new Error(`${err}`);
  }
};

const getSingleCategory = async (docId?: string) => {
  try {
    const docRef = doc(firestore, CATEGORY, docId);

    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
      throw new Error("No such document!");
    }
  } catch (err) {
    throw new Error(`${err}`);
  }
};

// =========== END OF CATEGORY ================

// =========== AUTHORS =======================
const addAuthor = async (payload: Partial<IAuthors>) => {
  try {
    const querySnapshot = await getDocs(
      query(
        collection(firestore, AUTHORS),
        where("author", "==", payload.author)
      )
    );

    if (querySnapshot.size) {
      throw new Error("Author were already exists.");
    } else {
      await addDoc(collection(firestore, AUTHORS), {
        ...payload,
        isArchived: false,
        createdAt: serverTimestamp(),
      });
    }
  } catch (err) {
    throw new Error(`${err}`);
  }
};

const getAuthors = async () => {
  try {
    const querySnapshot = await getDocs(collection(firestore, AUTHORS));

    return querySnapshot.docs.map((doc) => {
      return {
        ...doc.data(),
        id: doc.id,
      };
    });
  } catch (err) {
    throw new Error(`${err}`);
  }
};

const updateAuthor = async (payload: Partial<IAuthors>, docId: string) => {
  try {
    await updateDoc(doc(firestore, AUTHORS, docId), {
      ...payload,
      updatedAt: serverTimestamp(),
    });
  } catch (err) {
    throw new Error(`${err}`);
  }
};

// =========== END OF AUTHORS ================

// =============== GENRES ====================
const addGenres = async (payload: Partial<IGenres>) => {
  try {
    const querySnapshot = await getDocs(
      query(collection(firestore, GENRES), where("genre", "==", payload.genre))
    );

    if (querySnapshot.size) {
      throw new Error("Genre were already exists.");
    } else {
      await addDoc(collection(firestore, GENRES), {
        ...payload,
        isArchived: false,
        createdAt: serverTimestamp(),
      });
    }
  } catch (err) {
    throw new Error(`${err}`);
  }
};

const getGenres = async () => {
  try {
    const querySnapshot = await getDocs(collection(firestore, GENRES));

    return querySnapshot.docs.map((doc) => {
      return {
        ...doc.data(),
        id: doc.id,
      };
    });
  } catch (err) {
    throw new Error(`${err}`);
  }
};

const updateGenre = async (payload: Partial<IGenres>, docId: string) => {
  try {
    await updateDoc(doc(firestore, GENRES, docId), {
      ...payload,
      updatedAt: serverTimestamp(),
    });
  } catch (err) {
    throw new Error(`${err}`);
  }
};
// =========== END OF GENRES =================

// =========== USER ROLES ========================

const addUserRole = async (payload: Partial<IUserRole>) => {
  try {
    const querySnapshot = await getDocs(
      query(
        collection(firestore, USER_ROLE),
        where("userRole", "==", payload.userRole)
      )
    );

    if (querySnapshot.size) {
      throw new Error("User Role were already exists.");
    } else {
      await addDoc(collection(firestore, USER_ROLE), {
        ...payload,
        isArchived: false,
        createdAt: serverTimestamp(),
      });
    }
  } catch (err) {
    throw new Error(`${err}`);
  }
};

const getUserRole = async () => {
  try {
    const querySnapshot = await getDocs(collection(firestore, USER_ROLE));

    return querySnapshot.docs.map((doc) => {
      return {
        ...doc.data(),
        id: doc.id,
      };
    });
  } catch (err) {
    throw new Error(`${err}`);
  }
};

const updateUserRole = async (payload: Partial<IUserRole>, docId: string) => {
  try {
    await updateDoc(doc(firestore, USER_ROLE, docId), {
      ...payload,
      updatedAt: serverTimestamp(),
    });
  } catch (err) {
    throw new Error(`${err}`);
  }
};

// =========== END OF USER ROLES =================

// =========== CATALOGUE ========================
// const getCatalogueWithFilter = async () => {
//   try {
//     const querySnapshot = await getDocs(
//       query(
//         collection(firestore, CATALOGUE),
//         where("authors", "array-contains", {
//           value: "8b9db7VgWaIpeixldn57",
//           label: "George Orwell",
//         })
//         // where("isArchived", "==", false)
//       )
//     );

//     return querySnapshot.docs.map((doc) => {
//       return {
//         ...doc.data(),
//         id: doc.id,
//       };
//     });
//   } catch (err) {
//     throw new Error(`${err}`);
//   }
// };

const getCatalogue = async () => {
  try {
    const querySnapshot = await getDocs(collection(firestore, CATALOGUE));

    return querySnapshot.docs.map((doc) => {
      return {
        ...doc.data(),
        id: doc.id,
      };
    });
  } catch (err) {
    throw new Error(`${err}`);
  }
};

// =========== END OF CATALOGUE =================
// ============== USERS =================

const getUsers = async () => {
  try {
    const querySnapshot = await getDocs(collection(firestore, USERS));

    return querySnapshot.docs.map((doc) => {
      return {
        ...doc.data(),
        id: doc.id,
      };
    });
  } catch (err) {
    throw new Error(`${err}`);
  }
};

// =========== END OF USERS =================

// =========== EDUCATIONAL STAGES ========================

const addEducationalStage = async (payload: Partial<IEducationalStage>) => {
  try {
    const querySnapshot = await getDocs(
      query(
        collection(firestore, EDUCATIONAL_STAGE),
        where("educationalStage", "==", payload.educationalStage)
      )
    );

    if (querySnapshot.size) {
      throw new Error("Education Stage were already exists.");
    } else {
      await addDoc(collection(firestore, EDUCATIONAL_STAGE), {
        ...payload,
        isArchived: false,
        createdAt: serverTimestamp(),
      });
    }
  } catch (err) {
    throw new Error(`${err}`);
  }
};

const getEducationalStage = async () => {
  try {
    const querySnapshot = await getDocs(
      collection(firestore, EDUCATIONAL_STAGE)
    );

    return querySnapshot.docs.map((doc) => {
      return {
        ...doc.data(),
        id: doc.id,
      };
    });
  } catch (err) {
    throw new Error(`${err}`);
  }
};

const updateEducationalStage = async (
  payload: Partial<IEducationalStage>,
  docId: string,
  itemToBeUpdate?: string
) => {
  try {
    await updateDoc(doc(firestore, EDUCATIONAL_STAGE, docId), {
      ...payload,
      updatedAt: serverTimestamp(),
    });

    const batch = writeBatch(firestore);

    const querySnapshot = await getDocs(
      query(
        collection(firestore, GRADE_LEVEL),
        where("educationalStage", "==", itemToBeUpdate)
      )
    );

    querySnapshot.docs.map((data) => {
      console.log(data.data());
      batch.update(data.ref, { educationalStage: payload.educationalStage });
    });

    const courseQuerySnapshot = await getDocs(
      query(
        collection(firestore, ACADEMIC_COURSE),
        where("educationalStage", "==", itemToBeUpdate)
      )
    );

    courseQuerySnapshot.docs.map((data) => {
      batch.update(data.ref, { educationalStage: payload.educationalStage });
    });

    await batch.commit();
  } catch (err) {
    throw new Error(`${err}`);
  }
};

// =========== END OF EDUCATIONAL STAGES =================

// =========== GRADE LEVEL ========================

const addGradeLevel = async (payload: Partial<IGradeLevel>) => {
  try {
    const querySnapshot = await getDocs(
      query(
        collection(firestore, GRADE_LEVEL),
        where("gradeLevel", "==", payload.gradeLevel)
      )
    );

    if (querySnapshot.size) {
      throw new Error("Education Stage were already exists.");
    } else {
      await addDoc(collection(firestore, GRADE_LEVEL), {
        ...payload,
        isArchived: false,
        createdAt: serverTimestamp(),
      });
    }
  } catch (err) {
    throw new Error(`${err}`);
  }
};

const getGradeLevel = async () => {
  try {
    const querySnapshot = await getDocs(collection(firestore, GRADE_LEVEL));

    return querySnapshot.docs.map((doc) => {
      return {
        ...doc.data(),
        id: doc.id,
      };
    });
  } catch (err) {
    throw new Error(`${err}`);
  }
};

// const updateGradeLevel = async (
//   payload: Partial<>,
//   docId: string,
//   itemToBeUpdate?: string
// ) => {
//   try {
//     await updateDoc(doc(firestore, CATEGORY, docId), {
//       ...payload,
//       updatedAt: serverTimestamp(),
//     });

//     const batch = writeBatch(firestore);

//     const querySnapshot = await getDocs(
//       query(
//         collection(firestore, CATALOGUE),
//         where("itemType", "==", itemToBeUpdate)
//       )
//     );
//     querySnapshot.docs.map((data) => {
//       batch.update(data.ref, { itemType: payload.itemType });
//     });

//     await batch.commit();
//   } catch (err) {
//     throw new Error(`${err}`);
//   }
// };

// =========== END OF GRADE LEVEL =================

// =========== ACADEMIC COURSE ========================

const addAcademicCourse = async (payload: Partial<IAcademicCourse>) => {
  try {
    const querySnapshot = await getDocs(
      query(
        collection(firestore, ACADEMIC_COURSE),
        where("academicCourse", "==", payload.academicCourse)
      )
    );

    if (querySnapshot.size) {
      throw new Error("Academic Course were already exists.");
    } else {
      await addDoc(collection(firestore, ACADEMIC_COURSE), {
        ...payload,
        isArchived: false,
        createdAt: serverTimestamp(),
      });
    }
  } catch (err) {
    throw new Error(`${err}`);
  }
};

const getAcademicCourse = async () => {
  try {
    const querySnapshot = await getDocs(collection(firestore, ACADEMIC_COURSE));

    return querySnapshot.docs.map((doc) => {
      return {
        ...doc.data(),
        id: doc.id,
      };
    });
  } catch (err) {
    throw new Error(`${err}`);
  }
};

// =========== END OF ACADEMIC COURSE =================

// =========== EDUCATIONAL STAGES ========================
// =========== END OF EDUCATIONAL STAGES =================

export {
  addCategory,
  getCategory,
  getSingleCategory,
  updateCategory,
  addAuthor,
  getAuthors,
  updateAuthor,
  addGenres,
  getGenres,
  updateGenre,
  getCatalogue,
  addUserRole,
  getUserRole,
  updateUserRole,
  getUsers,
  addEducationalStage,
  getEducationalStage,
  updateEducationalStage,
  addGradeLevel,
  getGradeLevel,
  addAcademicCourse,
  getAcademicCourse,
};
