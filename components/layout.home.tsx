import Head from 'next/head'

function HomeLayout({ children }) {
  return (
    <>
      <Head>
        <title>Episode Picker</title>
        <meta
          name="description"
          content="Putting the fun back into watching your favorite show... Who knows what episode they'll choose!"
        />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <header className="p-2 border-bottom">
        <div className="container">
          <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            <a
              href="/"
              className="d-flex align-items-center mb-2 mb-lg-0 text-dark text-decoration-none"
            >
              <h1 className="display-6 pb-2">Episode Picker</h1>
            </a>

            <ul className="d-flex flex-auto align-items-center nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0 mx-auto">
              <li>
                <a href="#" className="nav-link px-2 link-dark">
                  Shows
                </a>
              </li>
              <li>
                <a href="#" className="nav-link px-2 link-dark">
                  Genres
                </a>
              </li>
              <li>
                <a href="#" className="nav-link px-2 link-dark">
                  Actors
                </a>
              </li>
              <li>
                <a href="#" className="nav-link px-2 link-dark">
                  About
                </a>
              </li>
            </ul>

            <form
              className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3"
              style={{ width: '18rem' }}
              role="search"
            >
              <input
                type="search"
                className="form-control"
                placeholder="Search..."
                aria-label="Search"
              />
            </form>
          </div>
        </div>
      </header>
      <main>{children}</main>
    </>
  )
}

export default HomeLayout
