import Koa from 'koa'
import koaBody from 'koa-body'
import config from '../config/config'
import arweaveRouter from './arweaveRouter'

const PORT = config.port

const app = new Koa()

app.use(async (ctx, next) => {
    try {
        await next()
    } catch (err: any) {
        ctx.status = err.status || err.statusCode || 500
        ctx.body = {
            message: err.message
        }
    }
})

app.use(koaBody({
    multipart: true,
    formidable: {
        maxFileSize: config.upload_img_size
    }
}));

app.use(arweaveRouter.routes())

app.listen(PORT, () => {
    console.log(`server is runing at prot: ${PORT}`)
})