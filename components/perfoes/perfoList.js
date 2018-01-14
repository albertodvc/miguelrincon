import Perfo from './perfo/perfo'

const PerfoList = (props) => (
	<ul>
		{props.perfoes.map((perfo, idx) => (
			<Perfo key={perfo.id} perfo={perfo} />
		))}
	</ul>
)

export default PerfoList
