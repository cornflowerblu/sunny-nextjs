import Head from 'next/head'

function Layout({ children }) {
    return (
        <>
            <Head>
                <title>Always Sunny Episode Selector</title>
                <meta name="description" content="Putting the fun back into watching your favorite show... Who knows what episode they'll choose!" />
                <meta charset="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-iYQeCzEYFbKjA/T2uDLTpkwGzCiq6soy8tYaI1GyVh/UjpbCx/TYkiZhlZB6+fzT" crossorigin="anonymous" />
            </Head>
            <body className='container mt-3' style={{ backgroundColor: '#eeeeeee0' }}>
                {children}
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-u1OknCvxWvY5kfmNBILK2hRnQC3Pr17a+RTT6rIHI7NnikvbZlHgTPOOmMi466C8" crossorigin="anonymous"></script>
            </body>
        </>
    )
}

export default Layout