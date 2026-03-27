import { create } from 'zustand';
import type { StudentProfile } from '../../shared/types/student';

interface StudentsState {
  students: StudentProfile[];
  selectedStudentId: string | null;
  setStudents: (students: StudentProfile[]) => void;
  selectStudent: (id: string | null) => void;
  upsertStudent: (student: StudentProfile) => void;
}

export const useStudentsStore = create<StudentsState>((set) => ({
  students: [],
  selectedStudentId: null,
  setStudents: (students) => set({ students }),
  selectStudent: (id) => set({ selectedStudentId: id }),
  upsertStudent: (student) =>
    set((state) => {
      const exists = state.students.find((s) => s.id === student.id);
      if (exists) {
        return {
          students: state.students.map((s) =>
            s.id === student.id ? student : s,
          ),
        };
      }
      return { students: [...state.students, student] };
    }),
}));

