import Header from './Header'
import Variables from '../styles/Variables'


const layoutStyle = {
	margin: 20,
	padding: 20,
	border: `1px solid ${Variables.brandSecundaryColor}`
}

const Layout = (props) => (
	<div style={layoutStyle}>
		<Header />
		{props.children}
	</div>
)

export default Layout
