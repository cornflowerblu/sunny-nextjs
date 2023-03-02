import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "./styles/notfound.module.scss";
import Image from "next/image";
import GoHomeFooter from "../components/go-home-footer";

const NotFoundPage = () => {
  const [results, setResults] = useState([]);
  const router = useRouter();
  return (
    <div className={styles.container}>
      <h1 className="fw-light">Whoops!</h1>
      <p className="lead text-muted">Looks like we couldn't find what you were looking for...</p>
      <Image src="/404-error-page.jpg" alt="404" width={598} height={398} style={{ marginBottom: '-50px' }} />
      <GoHomeFooter />
    </div>
  );
};

export default NotFoundPage;