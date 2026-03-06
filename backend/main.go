package main

import (
	"encoding/json"
	"net/http"
	"sync"
)

type Feedback struct {
	Name    string `json:"name"`
	Message string `json:"message"`
}

var (
	lastFeedback Feedback
	mu           sync.Mutex // Agar aman dari race condition
)

func main() {
	// Endpoint untuk SUBMIT (POST)
	http.HandleFunc("/api/feedback", func(w http.ResponseWriter, r *http.Request) {
		if r.Method == http.MethodPost {
			mu.Lock()
			json.NewDecoder(r.Body).Decode(&lastFeedback)
			mu.Unlock()
			w.WriteHeader(http.StatusOK)
			json.NewEncoder(w).Encode(map[string]string{"msg": "Data diterima!"})
			return
		}
	})

	// Endpoint untuk AMBIL data terakhir (GET)
	http.HandleFunc("/api/feedback/latest", func(w http.ResponseWriter, r *http.Request) {
		mu.Lock()
		defer mu.Unlock()
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(lastFeedback)
	})

	http.ListenAndServe(":8080", nil)
}