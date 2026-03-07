package main

import (
	"encoding/json"
	"log"
	"net/http"
	"strings"
	"time"
)

type Registration struct {
	Name  string `json:"name"`
	Email string `json:"email"`
	City  string `json:"city"`
}

type Response struct {
	Message string       `json:"message"`
	Data    Registration `json:"data"`
	Time    string       `json:"time"`
}

func registerHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "http://40.65.149.148")
	w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	if r.Method == http.MethodOptions {
		w.WriteHeader(http.StatusOK)
		return
	}

	if r.Method != http.MethodPost {
		http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
		return
	}

	var reg Registration

	err := json.NewDecoder(r.Body).Decode(&reg)
	if err != nil {
		http.Error(w, "Invalid JSON body", http.StatusBadRequest)
		return
	}

	reg.Name = strings.ToUpper(reg.Name)

	resp := Response{
		Message: "Registration received successfully!",
		Data:    reg,
		Time:    time.Now().Format(time.RFC1123),
	}

	w.Header().Set("Content-Type", "application/json")

	err = json.NewEncoder(w).Encode(resp)
	if err != nil {
		http.Error(w, "Failed to encode response", http.StatusInternalServerError)
		return
	}
}

func main() {
	http.HandleFunc("/api/register", registerHandler)

	log.Println("Server running on :8080")

	err := http.ListenAndServe(":8080", nil)
	if err != nil {
		log.Fatal(err)
	}
}