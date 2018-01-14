import Layout from '../components/MainLayout.js'
import {createClient} from '../lib/contentful.js'
const client = createClient()

const Performance =  (props) => (
    <Layout>
       <h1>{props.perf.fields.date}</h1>
    </Layout>
)

Performance.getInitialProps = async function (context) {

  const { id } = context.query
  const perf = await client.getEntry(id)
  console.log(perf)

  return { perf }
}

export default Performance
