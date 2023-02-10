import React, { useEffect } from 'react'
import HomeLayout from '../components/layout.home'
import style from './index.module.scss'



export default function Index() {
  return (
    <HomeLayout>
      <main>

        <section className="py-5 text-center container">
          <div className="row py-lg-5">
            <div className="col-lg-6 col-md-8 mx-auto">
              <h1 className="fw-light">Album example</h1>
              <p className="lead text-muted">Something short and leading about the collection below—its contents, the creator, etc. Make it short and sweet, but not too short so folks don’t simply skip over it entirely.</p>
              <p>
                <a href="#" className="btn btn-primary my-2 mx-4">Main call to action</a>
                <a href="#" className="btn btn-secondary my-2 mx-4">Secondary action</a>
              </p>
            </div>
          </div>
        </section>

        <div className="album py-5 bg-light">
          <div className={style.container}>

            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3 mx-4">
              <div className="col">
                <div className="card shadow-sm">
                  <div className="card-img-top">
                    <svg className={style.BDPlaceholderImg} width="100%" height="225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c" /><text x="40%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text></svg>
                  </div>
                  <div className="card-body">
                    <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="btn-group">
                        <button type="button" className="btn btn-sm btn-outline-secondary">View</button>
                      </div>
                      <small className="text-muted">15 Seasons</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </main>
    </HomeLayout>
  )
}
