import styles from './styles/notfound.module.scss'
import Image from 'next/image'
import GoHomeFooter from '../components/go-home-footer'

const NotFoundPage = () => {
  return (
    <div className={styles.container}>
      <h1 className="fw-light">Whoops!</h1>
      <p className="lead text-muted">
        Looks like we couldn&apos;t find what you were looking for...
      </p>
      <Image
        src="/404-error-page.jpg"
        alt="404"
        width={598}
        height={398}
        style={{ marginBottom: '-50px' }}
        priority
      />
      <GoHomeFooter />
    </div>
  )
}

export default NotFoundPage
