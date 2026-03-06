package main

import (
	"encoding/json"
	"fmt"
	"net/http"
)

type Feedback struct {
	Name    string `json:"name"`
	Message string `json:"message"`
}

func main() {
	http.HandleFunc("/api/feedback", func(w http.ResponseWriter, r *http.Request) {
		if r.Method == http.MethodPost {
			var fb Feedback
			json.NewDecoder(r.Body).Decode(&fb)
			fmt.Printf("Feedback: %+v\n", fb)
			w.Header().Set("Content-Type", "application/json")
			json.NewEncoder(w).Encode(map[string]string{"msg": "Data diterima!"})
			return
		}
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
	})
	http.ListenAndServe(":8080", nil)
}