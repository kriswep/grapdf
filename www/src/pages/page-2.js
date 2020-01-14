import React, { useState } from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const initialQuery = `{
  document(
    doc: [
      { title: { text: "Normal Title" } }
      { text: { text: "Normal Text" } }
      { title: { text: "Small Title", size: SMALL } }
      { text: { text: "Small Text", size: SMALL } }
      { title: { text: "Big Title", size: BIG } }
      { text: { text: "Big Text", size: BIG } }
    ]
  ) {
    blob
  }
}`

const SecondPage = () => {
  const [query, setQuery] = useState(initialQuery)

  const sendQuery = async evt => {
    const pdfBlob = await fetch("/.netlify/functions/grapdf", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    })
      .then(res => console.log(res) || res.json())
      .then(({ data, errors }) => {
        if (errors) {
          throw new Error(
            errors.reduce(
              (messages, currentError) =>
                messages
                  ? `${messages};
${currentError.message}`
                  : currentError.message,
              ""
            )
          )
        }

        return data.document.blob
      })
      .catch(err => {
        alert(`Error fetching: ${err.message}`)
      })
    if (!pdfBlob) return
    const link = document.createElement("a")
    link.href = pdfBlob
    link.download = "file.pdf"
    link.click()
  }

  return (
    <Layout>
      <SEO title="Demo" />
      <h1>Demo</h1>
      <p>Change and send the query</p>
      <label htmlFor="query">Enter your Query! </label>
      <textarea
        rows="10"
        id="query"
        value={query}
        onChange={evt => setQuery(evt.target.value)}
      />
      <button onClick={sendQuery}>Get PDF</button>
      <Link to="/">Go back to the homepage</Link>
    </Layout>
  )
}

export default SecondPage
