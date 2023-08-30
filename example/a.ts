import { Elysia, t } from '../src'

const cookie = new Elysia({
	name: '@elysiajs/cookie'
}).derive(() => {
	return {
		cookie: {
			a: 'B'
		}
	}
})

const plugin = new Elysia().use(cookie).model({
	A: t.String()
})

const app = new Elysia()
	// .use(cookie)
	// .use(plugin)
	// .model({
	// 	A: t.String()
	// })
	// .get(
	// 	'/id/:id',
	// 	(context) => {
	// 		return {
	// 			a: 'A'
	// 		}
	// 	},
	// 	{
	// 		body: 'A',
	// 		response: t.Object({
	// 			a: t.String()
	// 		})
	// 	}
	// )
	// .guard({
	//     query: t.Object({
	//         id: t.Numeric()
	//     })
	// })
	.group(
		'/id/:id',
		{
			params: t.Object({
				id: t.Numeric()
			})
		},
		(app) =>
			app
				.get('/awd', ({ params }) => {})
				.group(
					'/name/:name',
					{
						params: t.Object({
							id: t.Numeric(),
                            name: t.Numeric()
						})
					},
					(app) => app.get('/awd', ({ params }) => {})
				)
	)

type A = typeof app

// .use(
// 	new Elysia({ prefix: '/test', scoped: true })
// 		.derive(() => {
// 			console.log('test')
// 			return { test: 'test' }
// 		})
// 		.get('/', ({ test }) => test)
// )
// .use(new Elysia({ prefix: '/asdf' }).get('/', () => 'asdf'))

// new Elysia().use(app).listen(3000)
