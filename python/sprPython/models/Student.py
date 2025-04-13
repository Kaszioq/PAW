import datetime
from datetime import date


class Student:
    def __init__(self, _id: int, first_name: str, last_name: str, birth_date: datetime):
        self.id = _id
        self.first_name = first_name
        self.last_name = last_name
        self.birth_date = birth_date

    def __str__(self):
        return f"{self.first_name} {self.last_name} ({self.age})"

    @property
    def age(self):
        today = date.today()
        return today.year - self.birth_date.year - (
                (today.month, today.day) < (self.birth_date.month, self.birth_date.day)
        )
