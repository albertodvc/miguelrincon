
const PerfoParser = (perfo) => {
	return Object.assign(
		{},
			perfo.fields,
		{
			id: perfo.sys.id,
			location: Object.assign({id: perfo.fields.location.sys.id}, perfo.fields.location.fields),
			group: Object.assign({id: perfo.fields.group.sys.id}, perfo.fields.group.fields),
			date: new Date(perfo.fields.date)
		}
	)
}

export default PerfoParser
