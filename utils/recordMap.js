export default (record) => {
	return Object.assign(
		{},
			record.fields,
		{
			id: record.sys.id,
      group: Object.assign({id: record.fields.group.sys.id}, record.fields.group.fields),
      date: new Date(record.fields.date).getFullYear(),
      image: record.fields.image.fields.file.url,
      links: ['spotify', 'itunes', 'amazon'].map( link => {
        return {service: link, url: record.fields[link]}
      }).filter( service => !!service.url)
		}
	)
}
