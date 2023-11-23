export interface ICatalogue {
  id?: string;
  itemType?: string;
  title?: string;
  authors?: string;
  genres?: string;
  publisher?: string;
  yearPublished?: number;
  availableCopies?: number;
  status?: Boolean;
}

export interface IAuthors {
  id?: string;
  author?: string;
}

export interface IEducationalStage {
  id?: string;
  educationalStage?: string;
}

export interface IGenres {
  id?: string;
  genre?: string;
}

export interface IGradeLevel {
  id?: string;
  gradeLevel?: string;
  educationalStage?: string;
}

export interface IAcademicCourse {
  id?: string;
  academicCourse?: string;
  educationalStage?: string;
}

export interface IUserRole {
  id?: string;
  userRole?: string;
}

export interface IItemTypes {
  id?: string;
  itemType: string;
}
