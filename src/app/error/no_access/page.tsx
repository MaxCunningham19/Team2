import Link from "next/link";
import React from "react";

export default function Page() {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Oops! Something went wrong.</h1>
      <p>We&apos;re sorry, but the page you can&apos;t access this page.</p>
      <Link href="/">Go back to the homepage</Link>
      <Link href="/">Login</Link>
    </div>
  );
}
