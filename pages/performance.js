import Layout from '../components/MainLayout.js'
import {createClient} from '../lib/contentful.js'
const client = createClient()

import PerfoParser from '../util/parsers/perfo.js'

const Performance =  (props) => (
		<Layout>
			 <h1>{props.perfo.date.toString()}</h1>
			 <p>{props.perfo.location.city}</p>
			 <p>{props.perfo.group.name}</p>
		</Layout>
)

Performance.getInitialProps = async function (context) {

	const { id } = context.query
	const res = await client.getEntries({
		'content_type': 'performance',
		'sys.id': id,
		locale: 'es-ES',
		include: 5
	})
	const perfo = PerfoParser(res.items[0])

	return { perfo }
}

export default Performance
