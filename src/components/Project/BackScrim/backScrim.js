import styles from "./backScrim.module.scss"
import React from "react"
import { Link } from "gatsby"

const BackScrim = () => {
  return (
    <div className={styles.backScrim}>
      <Link className={styles.backButton} to="/#projects">
        Back to projects
      </Link>
    </div>
  )
}

export default BackScrim
