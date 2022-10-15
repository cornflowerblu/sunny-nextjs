import Layout from "../components/layout"
import EntryForm from "../components/entry-form"

export default function Test() {
    return <EntryForm />
}

Test.getLayout = function getLayout(page) {
    return (
        <Layout>
            {page}
        </Layout>
    )
}