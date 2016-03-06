from itertools import product


def hamming(string1, string2):
    result = 0
    for c1, c2 in zip(string1, string2):
        if c1 != c2:
            result += 1
    return result


def distance(Xi, word):
    j = len(word)
    result = len(word)
    for i in range(len(Xi) - j):
        #print("Comparing " + str(Xi[i:j+i]) + " to " + str(word)  + " result " + str(hamming(Xi[i:j+i], word)))
        hamm = hamming(Xi[i:j+i], word)
        if result > hamm:
            result = hamm
    return result


def distance2(Xi, word):
    j = len(word)
    result = len(word)
    for i in range(len(Xi) - j):
        hamm = hamming(Xi[i:j+i], word)
        if result > hamm:
            result = hamm
            motif = Xi[i:j+i]
    return motif

X = ["CCTGATAGACGCTATCTGGCTATCCAGGTACTTAGGTCCTCTGTGCGAATCTATGCGTTTCCAACCAT",
     "AGTACTGGTGTACATTTGATCCATACGTACACCGGCAACCTGAAACAAACGCTCAGAACCAGAAGTGC",
     "AAACGTTAGTGCACCCTCTTTCTTCGTGGCTCTGGCCAACGAGGGCTGATGTATAAGACGAAAATTTT",
     "AGCCTCCGATGTAAGTCATAGCTGTAACTATTACCTGCCACCCCTATTACATCTTACGTCCATATACA",
     "CTGTTATACAACGCGTCATGGCGGGGTATGCGTTTTGGTCGTCGTACGCTCGATCGTTACCGTACGGC"]


l = 8
t = len(X)
best = l+1


for permutation in product("ACGT", repeat=l):
    word = ''.join(permutation)
    for i in range(1, l+1):
        if i < l:
            prefix = word[:i]
            optimistic = 0
            for t in X:
                optimistic += distance(t, prefix)
            if optimistic > best:
                break
            else:
                i += 1
        else:
            score = 0
            for t in X:
                score += distance(t, word)
            if score < best:
                best = score
                median = word

print("Motif: ", median, "with score: ", best)


for t in X:
        print(distance2(t, median))

