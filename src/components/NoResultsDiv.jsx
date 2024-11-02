const NoResultsDiv = () => {
  return (
    <div className="no-result">
        <img src="icons/no-result.svg" alt="No result found" className="icon"/>
        <h3 className="title">Something went wrong</h3>
        <p className="message">We&apos;re unable to retrive the weather details. ensure you&apos;ve entered a valid city or try again later.!</p>
        </div>
  )
}

export default NoResultsDiv