a = []
final_text = ""
with open("sygnaly.txt", "r") as file:
    for line in file:
        a.append(line.strip())
for i in range(40, len(a)+1):
    if i%40==0:
        temp = a[i-1].strip()
        final_text += temp[9]
print(final_text)


