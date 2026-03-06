package main

import (
	"encoding/json"
	"fmt"
	"net/http"
)

type Feedback struct {
	Name    string `json:"name"`
	Email   string `json:"email"`
	Message string `json:"message"`
}

func feedbackHandler(w http.ResponseWriter, r *http.Request) {

	if r.Method != http.MethodPost {
		http.Error(w, "Only POST allowed", http.StatusMethodNotAllowed)
		return
	}

	var fb Feedback

	err := json.NewDecoder(r.Body).Decode(&fb)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	fmt.Println("New Feedback Received")
	fmt.Println("Name:", fb.Name)
	fmt.Println("Email:", fb.Email)
	fmt.Println("Message:", fb.Message)

	response := map[string]string{
		"status": "success",
		"message": "Thank you for your feedback!",
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}

func main() {

	http.HandleFunc("/api/feedback", feedbackHandler)

	fmt.Println("Backend running on :8080")
	http.ListenAndServe(":8080", nil)
}