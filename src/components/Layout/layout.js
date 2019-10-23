import "./reset.css"
import "./global.css"
import React from "react"
import styles from "./layout.module.scss"

const backgroundTransitionColors = ["#0000FF", "#FFFF00", "#00FFFF", "#FF00FF"]

export default ({ children }) =>
  console.log(process.env.NODE_ENV) || (
    <>
      <h1>{process.env.CONTEXT}</h1>
      <div className={styles.container}>{children}</div>
      <div
        className={styles.backgroundTransition}
        style={{
          backgroundColor:
            backgroundTransitionColors[
              Math.floor(Math.random() * backgroundTransitionColors.length)
            ],
        }}
      />
    </>
  )
