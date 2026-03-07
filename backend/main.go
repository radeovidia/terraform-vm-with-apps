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
	mu           sync.Mutex
)

// Middleware CORS: Izin buat browser
func enableCORS(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusOK)
			return
		}
		next(w, r)
	}
}

func main() {
	http.HandleFunc("/api/feedback", enableCORS(func(w http.ResponseWriter, r *http.Request) {
		if r.Method == http.MethodPost {
			mu.Lock()
			json.NewDecoder(r.Body).Decode(&lastFeedback)
			mu.Unlock()
			w.Header().Set("Content-Type", "application/json")
			json.NewEncoder(w).Encode(map[string]string{"msg": "Sukses!"})
		}
	}))
	http.ListenAndServe(":8080", nil)
}