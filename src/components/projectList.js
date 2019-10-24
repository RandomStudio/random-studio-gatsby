import React from "react"
import { Link } from "gatsby"
import styles from "./projectList.module.scss"
import Img from "gatsby-image"
import ReactMarkdown from "react-markdown"
import ProjectVideo from "./projectVideo"
import LazyImage from "./General/LazyImage/lazyImage"

export default ({ intro, middle, projects }) => (
  <div id="projects" className={styles.projects}>
    <div className={styles.statement}>
      <ReactMarkdown escapeHtml={false} source={intro} />
    </div>
    {projects.map(({ thumbnail, title, slug }, index) => (
      <React.Fragment key={index}>
        <Link
          className={styles.thumbnail}
          key={slug}
          id={slug}
          to={slug}
          style={{
            "--marginTop": `${thumbnail.marginTop}%`,
            "--marginLeft": `${thumbnail.marginLeft}%`,
            "--width": `${thumbnail.width}%`,
          }}
        >
          <div className={styles.media}>
            {thumbnail.video ? (
              <ProjectVideo
                video={{
                  autoplay: true,
                  isMuted: true,
                  hasControls: false,
                  loops: true,
                  url: thumbnail.video,
                }}
                ratio={thumbnail.ratio}
              />
            ) : (
              !!thumbnail.image && <LazyImage image={thumbnail.image} />
            )}
          </div>

          <div
            className={styles.title}
            style={{ marginLeft: !thumbnail.marginLeft && "1.4rem" }}
          >
            <ReactMarkdown escapeHtml={false} source={title} />
          </div>
        </Link>
        {(index === 3 ||
          (projects.length < 3 && index === projects.length - 1)) && (
          <div className={styles.intermittentStatement}>
            <ReactMarkdown escapeHtml={false} source={middle} />
          </div>
        )}
      </React.Fragment>
    ))}
  </div>
)
