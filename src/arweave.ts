import Arweave from 'arweave'
import jwk from '../config/jwk'

const AR_CONFIG = {
    host: 'arweave.net',
    port: 443,
    protocol: 'https'
}

export class MyArweave {
    private arweave: Arweave

    constructor() {
        this.arweave = Arweave.init(AR_CONFIG)
    }

    async upload(fileBuffer: Buffer, fileType: string) {
        let transaction = await this.arweave.createTransaction({
            data: fileBuffer
        }, jwk);
        transaction.addTag('Content-Type', fileType);

        await this.arweave.transactions.sign(transaction, jwk);

        let uploader = await this.arweave.transactions.getUploader(transaction);

        // console.log('uploader:::', uploader)
        while (!uploader.isComplete) {
            await uploader.uploadChunk();
            console.log(`${uploader.pctComplete}% complete, ${uploader.uploadedChunks}/${uploader.totalChunks}`);
        }
        // console.log('--->',transaction)
        // console.log('--->',uploader.pctComplete)
        return transaction.id
    }
}