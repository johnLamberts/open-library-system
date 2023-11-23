import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  useAcademicCourse,
  useEducationalStages,
  useGradeLevel,
} from "@/lib/react-query/queries";
import Loader from "@/components/shared/Loader";
import { IAcademicCourse, IGradeLevel } from "@/types";

const studentFormSchema = z.object({
  studentNumber: z.string(),
  firstName: z.string().min(1, { message: "This field is required" }),
  middleName: z.string().min(1, { message: "This field is required" }),
  lastName: z.string().min(1, { message: "This field is required" }),
  studentImg: z.custom<File[]>(),
  levelOfEducation: z.string(),
  gradeLevel: z.string(),
  academicCourse: z.string(),
});

type StudentFormValues = z.infer<typeof studentFormSchema>;

export interface CataloguesEditorProps {
  users?: Record<string, any>;

  updateEditorDirty?: () => void;
}

export default function StudentsForm({
  users = {},
  updateEditorDirty,
}: CataloguesEditorProps) {
  const { isLoading: isAcademicCourse, academicCourse } = useAcademicCourse();
  const { isLoading: isEducationStage, educationalStage } =
    useEducationalStages();
  const { isLoading: isGradeLevel, gradeLevel } = useGradeLevel();

  const [education, setEducation] = useState("");

  const { id: editId, ...otherValues } = users;

  const isNewRecord = Boolean(editId);

  const form = useForm({
    resolver: zodResolver(studentFormSchema),
    defaultValues: isNewRecord
      ? otherValues
      : {
          academicCourse: "",
        },
  });

  const onUpdateDirty = () => {
    updateEditorDirty();
  };

  const onSubmit = (payload: StudentFormValues) => {
    // saveChanges(payload, isNewRecord);
    if (isNewRecord) {
    } else {
      console.log(payload);
    }
  };

  if (isGradeLevel || isAcademicCourse || isEducationStage)
    return (
      <>
        <Loader height={48} width={48} />
        Loading...
      </>
    );

  const filterGradeLevel = gradeLevel.filter(
    (level: IGradeLevel) => level.educationalStage === education
  );

  const filterAcademicCourse = academicCourse.filter(
    (course: IAcademicCourse) => course.educationalStage === education
  );

  return (
    <div className="p-5">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 ">
          <FormField
            control={form.control}
            name="studentNumber"
            render={({ field: { onChange, ...field } }) => (
              <FormItem>
                <FormLabel>Student Number</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Your Student Number"
                    type="text"
                    onChange={(e) => {
                      if (!isNewRecord) {
                        onUpdateDirty();
                      }

                      onChange(e);
                    }}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="middleName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Middle Name</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    {...field}
                    value={"LMS2023"}
                    disabled
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <Separator />

          <FormField
            control={form.control}
            name="levelOfEducation"
            render={({ field: { ...field } }) => {
              setEducation(field.value);
              return (
                <FormItem>
                  <FormLabel>Level of Education</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a level of education" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {educationalStage?.map((item: any) => {
                        return (
                          <SelectItem value={item.educationalStage}>
                            {item.educationalStage}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <FormField
            control={form.control}
            name="gradeLevel"
            render={({ field: { ...field } }) => {
              return (
                <FormItem>
                  <FormLabel>Grade Level</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={!education}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a grade level" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {filterGradeLevel?.map((item: any) => {
                        return (
                          <SelectItem value={item.gradeLevel}>
                            {item.gradeLevel}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <FormField
            control={form.control}
            name="academicCourse"
            render={({ field: { ...field } }) => (
              <FormItem>
                <FormLabel>Academic Course</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={""}
                  disabled={filterGradeLevel.length === 0}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select academic course" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {filterAcademicCourse?.map((item: any) => {
                      return (
                        <SelectItem value={item.academicCourse}>
                          {item.academicCourse}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <Separator />
          <div
            className="flex justify-end gap-2 mt-10
        "
          >
            <Button type="submit">{isNewRecord ? "Modify" : "Submit"}</Button>
            <Button type="reset" onClick={form.reset}>
              Clear Field
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
