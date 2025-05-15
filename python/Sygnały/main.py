with open("sygnaly.txt", "r") as f:
    words = [line.strip() for line in f]

# Zadanie 4.1
msg = "".join(words[i][9] for i in range(39, len(words), 40))

# Zadanie 4.2
max_word = None
max_unique = 0
for w in words:
    uniq = len(set(w))
    if uniq > max_unique:
        max_unique = uniq
        max_word = w


# Zadanie 4.3
def within_10(w):
    vals = [ord(c) - ord('A') for c in w]
    return max(vals) - min(vals) <= 10


filtered = [w for w in words if within_10(w)]

with open("wyniki.txt", "w") as out:
    out.write("4.1. " + msg + "\n")
    out.write(f"4.2. {max_word} {max_unique}\n")
    out.write("4.3.\n")
    for w in filtered:
        out.write(w + "\n")