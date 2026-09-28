import type { Course, Lesson, LessonRecord } from "../types";
import { courses, isCoreCourse } from "../data/curriculum";

export function courseById(id: string): Course | undefined {
  return courses.find((c) => c.id === id);
}

export function lessonsOf(all: Lesson[], courseId: string): Lesson[] {
  return all.filter((l) => l.courseId === courseId);
}

export function isCourseComplete(
  courseId: string,
  all: Lesson[],
  records: Record<string, LessonRecord>,
): boolean {
  const list = lessonsOf(all, courseId);
  return list.length > 0 && list.every((l) => records[l.id]);
}

export function schoolCourses(): Course[] {
  return courses.filter((c) => c.phase === "school").sort((a, b) => a.order - b.order);
}

export function universityCourses(): Course[] {
  return courses.filter((c) => c.phase === "university").sort((a, b) => a.order - b.order);
}

export function isSchoolComplete(all: Lesson[], records: Record<string, LessonRecord>): boolean {
  return schoolCourses().every((c) => isCourseComplete(c.id, all, records));
}

export function isCourseUnlocked(
  course: Course,
  all: Lesson[],
  records: Record<string, LessonRecord>,
): boolean {
  if (course.phase === "school") {
    const prev = schoolCourses().filter((c) => c.order < course.order);
    return prev.every((c) => isCourseComplete(c.id, all, records));
  }
  if (!isSchoolComplete(all, records)) return false;
  if (lessonsOf(all, course.id).some((l) => records[l.id])) return true;
  return course.requires.every((id) => isCourseComplete(id, all, records));
}

export function isLessonUnlocked(
  lesson: Lesson,
  all: Lesson[],
  records: Record<string, LessonRecord>,
): boolean {
  const course = courseById(lesson.courseId);
  if (!course) return false;
  if (!isCourseUnlocked(course, all, records)) return false;
  const siblings = lessonsOf(all, lesson.courseId);
  const idx = siblings.findIndex((l) => l.id === lesson.id);
  if (idx <= 0) return true;
  if (records[lesson.id]) return true;
  return Boolean(records[siblings[idx - 1].id]);
}

export function coreLessons(all: Lesson[]): Lesson[] {
  return all.filter((l) => isCoreCourse(l.courseId));
}

function gpaIfComplete(list: Lesson[], records: Record<string, LessonRecord>): number | null {
  if (list.length === 0) return null;
  if (!list.every((l) => records[l.id])) return null;
  const sum = list.reduce((s, l) => s + records[l.id].grade, 0);
  return Math.round((sum / list.length) * 10) / 10;
}

/** GPA базового курса (школа + вузовское ядро). */
export function isCoreComplete(all: Lesson[], records: Record<string, LessonRecord>): boolean {
  return courses.filter((c) => isCoreCourse(c.id)).every((c) => isCourseComplete(c.id, all, records));
}

export function coreGpa(all: Lesson[], records: Record<string, LessonRecord>): number | null {
  if (!isCoreComplete(all, records)) return null;
  return gpaIfComplete(coreLessons(all), records);
}

/** GPA полного курса — все занятия программы. */
export function isFullComplete(all: Lesson[], records: Record<string, LessonRecord>): boolean {
  return courses.every((c) => isCourseComplete(c.id, all, records));
}

export function programGpa(all: Lesson[], records: Record<string, LessonRecord>): number | null {
  if (!isFullComplete(all, records)) return null;
  const ids = new Set(courses.map((c) => c.id));
  return gpaIfComplete(
    all.filter((l) => ids.has(l.courseId)),
    records,
  );
}

export function latinHonors(gpa: number): string {
  if (gpa >= 3.7) return "summa cum laude";
  if (gpa >= 3.3) return "magna cum laude";
  if (gpa >= 2.7) return "cum laude";
  return "cursus plenus";
}

export function currentGpa(records: Record<string, LessonRecord>): number | null {
  const vals = Object.values(records);
  if (vals.length === 0) return null;
  const sum = vals.reduce((s, r) => s + r.grade, 0);
  return Math.round((sum / vals.length) * 10) / 10;
}

/** Курсы, без которых этот ещё не открывается (для вуза — помимо всей школы). */
export function courseStandsOn(course: Course): Course[] {
  if (course.phase === "school") {
    const prev = schoolCourses().filter((c) => c.order < course.order);
    const last = prev[prev.length - 1];
    return last ? [last] : [];
  }
  return course.requires
    .map((id) => courseById(id))
    .filter((c): c is Course => Boolean(c));
}

/** Курсы, которые этот открывает напрямую. */
export function courseLeadsTo(course: Course): Course[] {
  if (course.phase === "school") {
    const next = schoolCourses().find((c) => c.order === course.order + 1);
    if (next) return [next];
    return courses.filter((c) => c.requires.includes(course.id));
  }
  return courses.filter((c) => c.requires.includes(course.id));
}

export function nextLesson(
  current: Lesson,
  all: Lesson[],
): Lesson | null {
  const siblings = lessonsOf(all, current.courseId);
  const idx = siblings.findIndex((l) => l.id === current.id);
  if (idx >= 0 && idx < siblings.length - 1) return siblings[idx + 1];
  const course = courseById(current.courseId);
  if (!course) return null;
  const ordered = [...courses].sort((a, b) => a.order - b.order);
  const cidx = ordered.findIndex((c) => c.id === course.id);
  for (let i = cidx + 1; i < ordered.length; i++) {
    const list = lessonsOf(all, ordered[i].id);
    if (list[0]) return list[0];
  }
  return null;
}
