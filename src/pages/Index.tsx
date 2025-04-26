"use client";

import { useState } from "react";

const prompts = [
  "How will your app perform on older, low-powered devices?",
  "Can the app still be useful without a constant internet connection?",
  "Have you minimized file sizes for faster loading on slow networks?",
  "Does your app avoid assuming users have unlimited data plans?",
  "Are your fonts large enough and readable on small screens?",
  "Does your design remain functional without relying on color cues alone?",
  "Have you ensured that all images and media are labeled for screen readers?",
  "Can users navigate your app entirely using a keyboard or assistive devices?",
  "Have you tested your app's usability without sound?",
  "Does your app offer clear, simple language understandable to non-native speakers?",
  "Have you avoided unnecessary tracking, analytics, or data collection?",
  "Can users opt out of data sharing easily without losing functionality?",
  "Does your app protect user identities and activities if used in oppressive environments?",
  "Are error messages clear, polite, and helpful rather than blaming the user?",
  "Have you accounted for cognitive diversity (e.g., offering simple modes or step-by-step options)?",
  "Is critical information accessible even with poor lighting or screen glare?",
  "Does the app load gracefully if external libraries or services fail?",
  "Can the app be used effectively with only intermittent electricity or charging?",
  "Have you localized date, time, and formatting for different regions and cultures?",
  "Does your design assume Western, English-speaking norms — and if so, how can you broaden it?"
];

export default function HomePage() {
  const [prompt, setPrompt] = useState("");

  function getRandomPrompt() {
    const randomIndex = Math.floor(Math.random() * prompts.length);
    setPrompt(prompts[randomIndex]);
  }

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      backgroundColor: "#f7f7f7",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
      textAlign: "center",
      padding: "2rem"
    }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "2rem" }}>Inclusive Design Prompter</h1>
      <p style={{ fontSize: "1.5rem", marginBottom: "2rem", maxWidth: "600px" }}>
        {prompt || "Click the button to receive an inclusive design prompt!"}
      </p>
      <button
        onClick={getRandomPrompt}
        style={{
          fontSize: "1.2rem",
          padding: "0.75rem 1.5rem",
          borderRadius: "8px",
          border: "none",
          backgroundColor: "#4CAF50",
          color: "white",
          cursor: "pointer",
          transition: "background-color 0.3s"
        }}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#45a049")}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#4CAF50")}
      >
        Get another prompt
      </button>
      <footer style={{ marginTop: "3rem", fontSize: "0.9rem", color: "#777" }}>
        Built with ❤️ using mkstack + Goose.
      </footer>
    </div>
  );
}
