import Layout from '../components/MainLayout.js'
import Link from 'next/link'
import {createClient} from '../lib/contentful.js'
const client = createClient()

const PerformanceLink = ({ perf }) => (
	<li key={perf.id}>
		<Link as={`/performances/${perf.id}`} href={`/performance?id=${perf.id}`}>
			<a>{perf.date}</a>
		</Link>
	</li>
)

const Index = (props) => (
	<Layout>
		<h1>Miguel Rincón performances</h1>
		<ul>
			{props.perfs.map((perf) => (
				<PerformanceLink key={perf.id} perf={perf}/>
			))}
		</ul>
	</Layout>
)

Index.getInitialProps = async function() {
	const res = await client.getEntries({
		'content_type': 'performance'
	})
	const perfs = res.items.map( item => Object.assign({id: item.sys.id}, item.fields) )
	console.log(perfs)
	return {
		perfs: perfs
	}
}

export default Index
