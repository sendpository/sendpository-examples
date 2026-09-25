// Send one email with the Sendpository API. Standard library only.
package main

import (
	"bufio"
	"bytes"
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"strings"
	"time"
)

type apiError struct {
	Error struct {
		Type    string `json:"type"`
		Message string `json:"message"`
	} `json:"error"`
}

func main() {
	loadEnv(".env")
	if len(os.Args) < 2 {
		fmt.Fprintln(os.Stderr, "Usage: go run . you@example.com")
		os.Exit(1)
	}

	base := os.Getenv("SENDPOSITORY_BASE_URL")
	if base == "" {
		base = "https://api.sendpository.com/v1"
	}

	body, _ := json.Marshal(map[string]any{
		"from":    os.Getenv("SENDPOSITORY_FROM"),
		"to":      []string{os.Args[1]},
		"subject": "Hello from Sendpository",
		"html":    "<p>It works. This email was sent with <strong>one API call</strong>.</p>",
		"text":    "It works. This email was sent with one API call.",
	})

	req, _ := http.NewRequest(http.MethodPost, base+"/emails", bytes.NewReader(body))
	req.Header.Set("Authorization", "Bearer "+os.Getenv("SENDPOSITORY_API_KEY"))
	req.Header.Set("Content-Type", "application/json")

	res, err := (&http.Client{Timeout: 10 * time.Second}).Do(req)
	if err != nil {
		fmt.Fprintln(os.Stderr, err)
		os.Exit(1)
	}
	defer res.Body.Close()

	if res.StatusCode >= 300 {
		var e apiError
		json.NewDecoder(res.Body).Decode(&e)
		fmt.Fprintf(os.Stderr, "%s: %s\n", e.Error.Type, e.Error.Message)
		os.Exit(1)
	}

	var ok struct {
		ID string `json:"id"`
	}
	json.NewDecoder(res.Body).Decode(&ok)
	fmt.Println("Sent. Message id:", ok.ID)
}

// loadEnv reads KEY=value lines into the environment, without overriding
// variables that are already set.
func loadEnv(path string) {
	f, err := os.Open(path)
	if err != nil {
		return
	}
	defer f.Close()
	s := bufio.NewScanner(f)
	for s.Scan() {
		line := strings.TrimSpace(s.Text())
		key, value, found := strings.Cut(line, "=")
		if !found || strings.HasPrefix(line, "#") {
			continue
		}
		if _, set := os.LookupEnv(strings.TrimSpace(key)); !set {
			os.Setenv(strings.TrimSpace(key), strings.Trim(strings.TrimSpace(value), `"`))
		}
	}
}
