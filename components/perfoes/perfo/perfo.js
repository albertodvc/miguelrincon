import Link from 'next/link'

const Perfo = ({ perfo }) => (
	<li key={perfo.id}>
		<Link as={`/performances/${perfo.id}`} href={`/performance?id=${perfo.id}`}>
			<a>{perfo.date.toString()}</a>
		</Link>
		<p>{perfo.location.city}</p>
		<p>{perfo.group.name}</p>
	</li>
)

export default Perfo
