
package main

import (
	"encoding/json"
	"net/http"
	"os"
)

type Form struct {
	Name  string `json:"name"`
	Email string `json:"email"`
}

func submit(w http.ResponseWriter, r *http.Request) {
	var form Form
	json.NewDecoder(r.Body).Decode(&form)

	json.NewEncoder(w).Encode(map[string]string{
		"message": "Success",
	})
}

func main() {

	port := os.Getenv("APP_PORT")

	if port == "" {
		port = "8080"
	}

	http.HandleFunc("/api/submit", submit)

	http.ListenAndServe(":"+port, nil)
}
