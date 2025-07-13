import React from 'react'
import { Spinner } from 'react-bootstrap'

function GlobalLoader(): React.JSX.Element {
  return (
    <div>
      <Spinner animation="border" />;
    </div>
  )
}

export default GlobalLoader