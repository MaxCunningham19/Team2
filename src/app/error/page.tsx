import Link from "next/link";
import React from "react";

export default function ErrorPage() {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Oops! Something went wrong.</h1>
      <p>
        We&apos;re sorry, but the page you were looking for doesn&apos;t exist.
      </p>
      <Link href="/">Go back to the homepage</Link>
    </div>
  );
}
