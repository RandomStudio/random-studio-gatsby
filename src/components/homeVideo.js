import React from "react"
import { Link } from "gatsby"
import styles from "./homeVideo.module.scss"

export default ({ collaborationCredits, videoUrl }) => (
  <div className={styles.video}>
    <video src={videoUrl} muted loop autoPlay playsInline />
    <h1 className={styles.logo}>
      Random
      <br />
      Studio
    </h1>
    <Link to="/#projects" className={styles.videoOverlay}>
      Projects
    </Link>
    {collaborationCredits && (
      <div className={styles.featuredAuthor}>
        <span className={styles.logo}>Random Studio</span>
        <span> × </span>
        <span>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={collaborationCredits.url}
          >
            {collaborationCredits.collaborator}
          </a>
        </span>
      </div>
    )}
  </div>
)
