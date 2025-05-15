class Student:
    def __init__(self, ident, name, surname, age):
        self.ident = ident
        self.name = name
        self.surname = surname
        self.age = age

    @classmethod
    def create(cls, ident, name, surname, age):
        return cls(ident, name, surname, age)


class Course:
    def __init__(self, ident, course_name):
        self.ident = ident
        self.course_name = course_name

    @classmethod
    def create(cls, ident, course_name):
        return cls(ident, course_name)


Students = []
Courses = []
StudentsCourses = []
with open('students.txt', 'r', encoding="utf-8") as student, open('courses.txt', 'r', encoding="utf-8") as courses:
    lines1 = student.readlines()
    lines2 = courses.readlines()
    for line in lines1:
        line1 = line.strip().split(',')
        Students.append(Student.create(line1[0], line1[1], line1[2], line1[3]))
    for line in lines2:
        line2 = line.strip().split(',')
        Courses.append(Course.create(line2[0], line2[1]))
for i in Students:
    temp = [Students.index(i)]
    for j in Courses:
        if i.ident == j.ident:
            temp.append(j)
    StudentsCourses.append(temp)
for i in StudentsCourses:
    User = Students[i[0]]
    temp2 = []
    file2 = open(User.name + "_" + User.surname + '.txt', 'a')
    file2.write('Kursy:\n')
    for j in range(1,len(i)):
        temp2.append(i[j].course_name)
        file2.write('- ' + i[j].course_name + ",\n")
    coursesStr = ", ".join(temp2)
    print(User.name + " " + User.surname + " (" + User.age + "): " + coursesStr)
