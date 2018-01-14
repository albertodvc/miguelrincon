import Layout from '../components/MainLayout.js'
import Link from 'next/link'
import {createClient} from '../lib/contentful.js'
const client = createClient()

import PerfoParser from '../util/parsers/perfo.js'
import PerfoList from '../components/perfoes/perfoList'



const Index = (props) => (
	<Layout>
		<h1>Miguel Rincón performances</h1>
		<PerfoList perfoes={props.perfoes}/>
	</Layout>
)

Index.getInitialProps = async function() {
	const { items } = await client.getEntries({
		'content_type': 'performance',
		include: 3
	})
	return {
		perfoes: items.map(PerfoParser)
	}
}

export default Index
