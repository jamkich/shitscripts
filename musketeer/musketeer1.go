// https://codeforces.com/problemset/problem/574/B
// solution made using dfs!

package main

import (
	"fmt"
)

var (
	MAX_N   int  = 4001
	edges        = make([][]int, MAX_N)
	visited      = make([]bool, MAX_N)
	recog        = make([]int, MAX_N)
	counter int  = 0
	found   bool = false
)

func dfs(n int, prev int) {
	visited[n] = true
	recog[n] = counter
	counter++

	for _, u := range edges[n] {
		if !visited[u] {
			dfs(u, n)
		} else if u != prev {
			if recog[n]-recog[u] == 2 {
				for _, w := range edges[u] {
					if w != n && contains(edges[n], w) {
						fmt.Println(n, u, w)

						extraEdges := countExtraEdges(n, u, w)
						fmt.Println(extraEdges)
						found = true
						return
					}
				}
			}
		}
	}
}

func contains(s []int, e int) bool {
	for _, a := range s {
		if a == e {
			return true
		}
	}
	return false
}

func countExtraEdges(a, b, c int) int {
	extraEdges := 0

	checkNeighbors := func(node, e1, e2 int) {
		for _, neighbor := range edges[node] {
			if neighbor != e1 && neighbor != e2 {
				extraEdges++
			}
		}
	}

	checkNeighbors(a, b, c)
	checkNeighbors(b, a, c)
	checkNeighbors(c, a, b)
	return extraEdges
}

func main() {
	var warriors, pairs int
	fmt.Scan(&warriors, &pairs)
	for i := 0; i < pairs; i++ {
		var a, b int
		fmt.Scan(&a, &b)
		edges[a] = append(edges[a], b)
		edges[b] = append(edges[b], a)
	}

	dfs(1, -1)
	if !found {
		fmt.Println(-1)
	}
}
