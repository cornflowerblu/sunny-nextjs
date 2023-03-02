import Link from "next/link";

export default function GoHomeFooter() {
  return (
    <footer className="text-muted py-5">
      <p className="d-flex flex-auto justify-content-center mb-1 mx-auto">
        <Link className="text-muted py-5 text-decoration-none" href={'/'}>
          Back to home
        </Link>
      </p>
    </footer>
  )
}