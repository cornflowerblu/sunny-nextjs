import Layout from "../components/layout"

export default function Index() {
    return (
        <section>
            <h2>Layout Example (Index)</h2>
            <p>
                This example adds a property <code>getLayout</code> to your page,
                allowing you to return a React component for the layout. This allows you
                to define the layout on a per-page basis. Since we're returning a
                function, we can have complex nested layouts if desired.
            </p>
        </section>
    )
}

Index.getLayout = function getLayout(page) {
    return (
        <Layout>
            {page}
        </Layout>
    )
}