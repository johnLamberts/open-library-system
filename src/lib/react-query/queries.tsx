import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "./queries-keys";
import {
  addAcademicCourse,
  addAuthor,
  addCategory,
  addEducationalStage,
  addGenres,
  addGradeLevel,
  addUserRole,
  getAcademicCourse,
  getAuthors,
  getCatalogue,
  getCategory,
  getEducationalStage,
  getGenres,
  getGradeLevel,
  getSingleCategory,
  getUserRole,
  getUsers,
  updateAuthor,
  updateCategory,
  updateEducationalStage,
  updateGenre,
  updateUserRole,
} from "@/services/api";
import { toast } from "@/components/ui/use-toast";

//---------------------------------------------
// =============== CATEGORY ===================

export function useCategory() {
  const {
    isLoading,
    data: category,
    error,
  } = useQuery({
    queryKey: [QUERY_KEYS.CATEGORY],
    queryFn: getCategory,
  });

  return { isLoading, category, error };
}

export function useSingleCategory() {
  const {
    isLoading,
    data: singleCategory,
    error,
  } = useQuery({
    queryKey: [QUERY_KEYS.CATEGORY],
    queryFn: ({ docId }: any) => getSingleCategory(docId),
  });

  return { isLoading, singleCategory, error };
}

export function useCreateCategory() {
  const queryClient = useQueryClient();
  const { isPending: isCreating, mutate: createCategory } = useMutation({
    mutationFn: addCategory,
    onSuccess: () => {
      toast({
        title: "Success",
        description: "You successfully created new category!",
      });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CATEGORY] });
    },
    onError: (err) =>
      toast({
        title: "Error",
        description: `${err}`,
      }),
  });

  return { isCreating, createCategory };
}

export function useModifyCategory() {
  const queryClient = useQueryClient();
  const { isPending: isModifying, mutate: modifyCategory } = useMutation({
    mutationFn: ({ newData, docId, oldItemType }: any) =>
      updateCategory(newData, docId, oldItemType),
    onSuccess: () => {
      toast({
        title: "Success",
        description: `This category has been successfully updated!`,
      });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CATEGORY] });
    },
    onError: (err) =>
      toast({
        title: "Error",
        description: `${err}`,
      }),
  });

  return { isModifying, modifyCategory };
}
// =========== END OF CATEGORY ================
//---------------------------------------------

//---------------------------------------------
// =========== AUTHOR =========================

export function useAuthors() {
  const {
    isLoading,
    data: authors,
    error,
  } = useQuery({
    queryKey: [QUERY_KEYS.AUTHORS],
    queryFn: getAuthors,
  });

  return { isLoading, authors, error };
}

export function useCreateAuthor() {
  const queryClient = useQueryClient();
  const { isPending: isCreating, mutate: createAuthor } = useMutation({
    mutationFn: addAuthor,
    onSuccess: () => {
      toast({
        title: "Success",
        description: "You successfully created new author!",
      });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.AUTHORS] });
    },
    onError: (err) =>
      toast({
        title: "Error",
        description: `${err}`,
      }),
  });

  return { isCreating, createAuthor };
}

export function useModifyAuthor() {
  const queryClient = useQueryClient();
  const { isPending: isModifying, mutate: modifyAuthor } = useMutation({
    mutationFn: ({ newData, docId }: any) => updateAuthor(newData, docId),
    onSuccess: () => {
      toast({
        title: "Success",
        description: `This author has been successfully updated!`,
      });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.AUTHORS] });
    },
    onError: (err) =>
      toast({
        title: "Error",
        description: `${err}`,
      }),
  });

  return { isModifying, modifyAuthor };
}
// =========== END OF AUTHOR ==================
//---------------------------------------------

//---------------------------------------------
// =========== GENRES =========================

export function useGenres() {
  const {
    isLoading,
    data: genres,
    error,
  } = useQuery({
    queryKey: [QUERY_KEYS.GENRES],
    queryFn: getGenres,
  });

  return { isLoading, genres, error };
}

export function useCreateGenre() {
  const queryClient = useQueryClient();
  const { isPending: isCreating, mutate: createGenre } = useMutation({
    mutationFn: addGenres,
    onSuccess: () => {
      toast({
        title: "Success",
        description: "You successfully created new genre!",
      });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GENRES] });
    },
    onError: (err) =>
      toast({
        title: "Error",
        description: `${err}`,
      }),
  });

  return { isCreating, createGenre };
}

export function useModifyGenre() {
  const queryClient = useQueryClient();
  const { isPending: isModifying, mutate: modifyGenre } = useMutation({
    mutationFn: ({ newData, docId }: any) => updateGenre(newData, docId),
    onSuccess: () => {
      toast({
        title: "Success",
        description: `This genre has been successfully updated!`,
      });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GENRES] });
    },
    onError: (err) =>
      toast({
        title: "Error",
        description: `${err}`,
      }),
  });

  return { isModifying, modifyGenre };
}
// =========== END OF GENRES ==================
//---------------------------------------------

//---------------------------------------------
// =========== CATALOGUE =========================

export function useCatalogue() {
  const {
    isLoading,
    data: catalogue,
    error,
  } = useQuery({
    queryKey: [QUERY_KEYS.CATALOGUE],
    queryFn: getCatalogue,
  });

  return { isLoading, catalogue, error };
}

// =========== END OF CATALOGUE ==================
//---------------------------------------------

//---------------------------------------------
// =========== USER ROLES =========================

export function useUserRole() {
  const {
    isLoading,
    data: userRole,
    error,
  } = useQuery({
    queryKey: [QUERY_KEYS.USER_ROLE],
    queryFn: getUserRole,
  });

  return { isLoading, userRole, error };
}

export function useCreateUserRole() {
  const queryClient = useQueryClient();
  const { isPending: isCreating, mutate: createUserRole } = useMutation({
    mutationFn: addUserRole,
    onSuccess: () => {
      toast({
        title: "Success",
        description: "You successfully created new user role!",
      });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USER_ROLE] });
    },
    onError: (err) =>
      toast({
        title: "Error",
        description: `${err}`,
      }),
  });

  return { isCreating, createUserRole };
}

export function useModifyUserRole() {
  const queryClient = useQueryClient();
  const { isPending: isModifying, mutate: modifyUserRole } = useMutation({
    mutationFn: ({ newData, docId }: any) => updateUserRole(newData, docId),
    onSuccess: () => {
      toast({
        title: "Success",
        description: `This genre has been successfully updated!`,
      });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USER_ROLE] });
    },
    onError: (err) =>
      toast({
        title: "Error",
        description: `${err}`,
      }),
  });

  return { isModifying, modifyUserRole };
}

// =========== END OF USER ROLES ==================
//---------------------------------------------

//---------------------------------------------
// =========== USERS =========================

export function useUsers() {
  const {
    isLoading,
    data: userRole,
    error,
  } = useQuery({
    queryKey: [QUERY_KEYS.USERS],
    queryFn: getUsers,
  });

  return { isLoading, userRole, error };
}

// =========== END OF USERS ==================
//---------------------------------------------

//---------------------------------------------
// =========== EDUCATIONAL STAGES =========================

export function useEducationalStages() {
  const {
    isLoading,
    data: educationalStage,
    error,
  } = useQuery({
    queryKey: [QUERY_KEYS.EDUCATIONAL_STAGE],
    queryFn: getEducationalStage,
  });

  return { isLoading, educationalStage, error };
}

export function useCreateEducationalStages() {
  const queryClient = useQueryClient();
  const { isPending: isCreating, mutate: createEducationalStage } = useMutation(
    {
      mutationFn: addEducationalStage,
      onSuccess: () => {
        toast({
          title: "Success",
          description: "You successfully created new educational stage!",
        });
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.EDUCATIONAL_STAGE],
        });
      },
      onError: (err) =>
        toast({
          title: "Error",
          description: `${err}`,
        }),
    }
  );

  return { isCreating, createEducationalStage };
}

export function useModifyEducationalStage() {
  const queryClient = useQueryClient();
  const { isPending: isModifying, mutate: modifyEducationalStage } =
    useMutation({
      mutationFn: ({ newData, docId, oldItem }: any) =>
        updateEducationalStage(newData, docId, oldItem),
      onSuccess: () => {
        toast({
          title: "Success",
          description: `This educational stage has been successfully updated!`,
        });
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.EDUCATIONAL_STAGE],
        });
      },
      onError: (err) =>
        toast({
          title: "Error",
          description: `${err}`,
        }),
    });

  return { isModifying, modifyEducationalStage };
}
// =========== END OF EDUCATIONAL STAGES ==================
//---------------------------------------------

//---------------------------------------------
// =========== GRADE LEVEL =========================

export function useGradeLevel() {
  const {
    isLoading,
    data: gradeLevel,
    error,
  } = useQuery({
    queryKey: [QUERY_KEYS.GRADE_LEVEL],
    queryFn: getGradeLevel,
  });

  return { isLoading, gradeLevel, error };
}

export function useCreateGradeLevel() {
  const queryClient = useQueryClient();
  const { isPending: isCreating, mutate: createGradeLevel } = useMutation({
    mutationFn: addGradeLevel,
    onSuccess: () => {
      toast({
        title: "Success",
        description: "You successfully created new grade level!",
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GRADE_LEVEL],
      });
    },
    onError: (err) =>
      toast({
        title: "Error",
        description: `${err}`,
      }),
  });

  return { isCreating, createGradeLevel };
}

// =========== END OF GRADE LEVEL ==================
//---------------------------------------------

//---------------------------------------------
// =========== ACADEMIC COURSES =========================

export function useAcademicCourse() {
  const {
    isLoading,
    data: academicCourse,
    error,
  } = useQuery({
    queryKey: [QUERY_KEYS.ACADEMIC_COURSE],
    queryFn: getAcademicCourse,
  });

  return { isLoading, academicCourse, error };
}

export function useCreateAcademicCourse() {
  const queryClient = useQueryClient();
  const { isPending: isCreating, mutate: createAcademicCourse } = useMutation({
    mutationFn: addAcademicCourse,
    onSuccess: () => {
      toast({
        title: "Success",
        description: "You successfully created academic course!",
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.ACADEMIC_COURSE],
      });
    },
    onError: (err) =>
      toast({
        title: "Error",
        description: `${err}`,
      }),
  });

  return { isCreating, createAcademicCourse };
}

// =========== END OF ACADEMIC COURSES ==================
//---------------------------------------------

//---------------------------------------------
// =========== GENRES =========================

// =========== END OF GENRES ==================
//---------------------------------------------
