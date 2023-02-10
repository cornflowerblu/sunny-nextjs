import Head from "next/head"

function Layout({ children }) {
    return (
        <>
            <Head>
                <title>Always Sunny Episode Selector</title>
                <meta name="description" content="Putting the fun back into watching your favorite show... Who knows what episode they'll choose!" />
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <main>{children}</main>
        </>
    )
}

export default Layout