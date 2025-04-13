from .Student import Student
from .Subject import Subject


class Grade:
    def __init__(self, grades: list[int], student: Student, subject: Subject):
        self.grades = grades
        self.student = student
        self.subject = subject

    def add_grade(self, grade):
        if 1 <= grade <= 6:
            self.grades.append(grade)
        else:
            raise ValueError('Grade must be between 1 and 6')

    def get_grades(self):
        return self.grades

    def get_average(self):
        return sum(self.grades) / float(len(self.grades))

