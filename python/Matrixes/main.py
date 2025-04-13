f = open("list.txt", 'r')
c = 0
matrix = []
for lines in f:
    line = lines.strip().split(" ")
    if c == 0:
        matrix = [[0] * int(line[0]) for _ in range(int(line[0]))]
    if c>0:
        x_index = int(line[0])
        for i in range(1, len(line)):
            print(str(x_index) + " połączenie dla: " + str(line[i]))
            matrix[x_index][int(line[i])] = 1
    c += 1
print(matrix)