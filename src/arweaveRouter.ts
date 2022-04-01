import Router from "koa-router";
import config from "../config/config";
import { IUploadFile } from "./type";
import fs from 'fs'
import path from 'path'
import { MyArweave } from "./arweave";

const arweaveRouter = new Router({ prefix: config.api_prefix + 'arweave' })

arweaveRouter.post('/upload', (ctx, next) => {
    return new Promise((resolve, reject) => {
        const file: IUploadFile = ctx.request?.files?.[config.upload_file_name] as unknown as IUploadFile
        const fileName = file.name

        // 创建可读流
        const render = fs.createReadStream(file.path);
        const filePath = path.join(config.upload_path, fileName);
        const fileDir = path.join(config.upload_path);

        if (!fs.existsSync(fileDir)) {
            fs.mkdirSync(fileDir);
        }

        const upStream = fs.createWriteStream(filePath);
        render.pipe(upStream);
        ctx.state.filePath = filePath
        console.log(file.type)
        ctx.state.fileType = file.type
        ctx.body = {}
        resolve(next())
    })
}, (ctx, next) => {
    return new Promise((resolve) => {
        fs.readFile(ctx.state.filePath, (err, fileBuffer) => {
            const arweave = new MyArweave()
            arweave.upload(fileBuffer, ctx.state.fileType).then((hash) => {
                ctx.body.fileSrc = `https://arweave.net/${hash}`
                resolve(next())
            })
        })
    })
}, (ctx) => {
    fs.unlinkSync(ctx.state.filePath)
    ctx.body.code = 200
    ctx.body.msg = 'upload success'
})

export default arweaveRouter