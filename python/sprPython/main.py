__copyright__ = "Zespół Szkół Komunikacji"
__author__ = "Kuba Kaszewski 4C"

from models.Teacher import Teacher
from models.Student import Student
from models.Subject import Subject
from models.Grade import Grade
from year_grade import year_grade
from datetime import datetime
import json

teachers: list[Teacher] = []
with open("teachers.txt", "r", encoding="utf-8") as file:
    for line in file:
        parts = line.strip().split()
        if len(parts) != 3:
            continue
        teacher_id, first_name, last_name = parts
        teachers.append(Teacher(int(teacher_id), first_name, last_name))

teachers_by_id = {teacher.id: teacher for teacher in teachers}

students: list[Student] = []
with open("students.txt", "r", encoding="utf-8") as file:
    for line in file:
        parts = line.strip().split()
        if len(parts) != 4:
            continue
        student_id, first_name, last_name, birth_date_str = parts
        birth_date = datetime.strptime(birth_date_str, "%Y-%m-%d").date()
        students.append(Student(int(student_id), first_name, last_name, birth_date))

students_by_id = {student.id: student for student in students}

subjects: list[Subject] = []
with open("subjects.txt", "r", encoding="utf-8") as file:
    for line in file:
        parts = line.strip().split()
        if len(parts) < 3:
            continue
        subject_id = int(parts[0])
        teacher_id = int(parts[-1])
        name = " ".join(parts[1:-1])
        teacher = teachers_by_id.get(teacher_id)
        if teacher:
            subjects.append(Subject(subject_id, name, teacher))

subjects_by_id = {subject.id: subject for subject in subjects}

grades: list[Grade] = []
with open("grades.txt", "r", encoding="utf-8") as file:
    for line in file:
        parts = line.strip().split()
        if len(parts) != 3:
            continue
        student_id, subject_id = int(parts[0]), int(parts[1])
        try:
            grade_values = list(map(int, parts[2].split(",")))
        except ValueError:
            continue
        student = students_by_id.get(student_id)
        subject = subjects_by_id.get(subject_id)
        if student and subject:
            grades.append(Grade(grade_values, student, subject))

print("Oceny i średnie poszczególnych uczniów:\n")
students_json = []

for student in students:
    data = {}
    print(f"{student}:")
    for subject in subjects:
        student_grades = [g for g in grades if g.student == student and g.subject == subject]
        if not student_grades:
            continue
        all_grades = student_grades[0].grades
        avg = round(sum(all_grades) / len(all_grades), 2)
        final = year_grade(avg)
        print(f"{subject.name}:")
        print("Oceny:", ", ".join(map(str, all_grades)))
        print(f"Średnia: {avg}")
        print(f"Ocena końcowa: {final}\n")
        data[subject.name] = {
            "Oceny": ", ".join(map(str, all_grades)),
            "Srednia": avg,
            "Ocena roczna": final
        }
    students_json.append({str(student): data})
    print()

with open("students.json", "w", encoding="utf-8") as f:
    json.dump(students_json, f, indent=4)

print("=" * 50)
print()
subjects_json = []

for subject in subjects:
    subject_grades = [g.grades for g in grades if g.subject == subject]
    flat_grades = [grade for sublist in subject_grades for grade in sublist]
    if not flat_grades:
        continue
    avg = round(sum(flat_grades) / len(flat_grades), 2)
    print(f"{subject.name}:")
    print(f"Nauczyciel: {subject.teacher}")
    print("Oceny:", ", ".join(map(str, flat_grades)))
    print(f"Średnia: {avg}\n")
    subjects_json.append({
        subject.name: {
            "Nauczyciel": str(subject.teacher),
            "Oceny": flat_grades,
            "Srednia": avg
        }
    })

with open("subjects.json", "w", encoding="utf-8") as f:
    json.dump(subjects_json, f, indent=4)
