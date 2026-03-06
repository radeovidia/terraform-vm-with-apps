package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
)

type Feedback struct {
	Name    string `json:"name"`
	Message string `json:"message"`
}

func main() {
	http.HandleFunc("/api/feedback", func(w http.ResponseWriter, r *http.Request) {
		// Handle CORS manual karena Nginx akan meneruskan request
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

		if r.Method == "OPTIONS" {
			return
		}

		if r.Method == http.MethodPost {
			var fb Feedback
			if err := json.NewDecoder(r.Body).Decode(&fb); err != nil {
				http.Error(w, err.Error(), http.StatusBadRequest)
				return
			}
			fmt.Printf("Feedback masuk: %s - %s\n", fb.Name, fb.Message)
			w.WriteHeader(http.StatusOK)
			json.NewEncoder(w).Encode(map[string]string{"msg": "Berhasil terkirim!"})
		}
	})

	fmt.Println("Backend jalan di port 8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}