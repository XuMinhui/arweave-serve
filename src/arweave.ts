import Arweave from 'arweave'

const AR_CONFIG = {
    host: 'arweave.net',
    port: 443,
    protocol: 'https'
}

const jwk = {
    "kty": "RSA",
    "n": "pd4UgfXm5fklVVw9aGjcsejpym1GhpEqh_AaQkH39gjX1lfKBvewQbRqCaD9e2L2QxCqOKwjenx9x01Ii7sM6isNW9JTGGmgfBqs51J1OjSL2ooywljSX5eAYWpTsjgqoQcC6USN7d8BF1rT0Z3SeV4e8VG-LsRk7Z8vupLOAgejEwI2O6SAugkZvXpdXDPYwiZayYKBLB14MdZeJgyJIu6NHh01_x-wCuz86jpJXvODx9XuGWlE8rPOUnPxsL71vVmGW_sOtnjC4ZkqgB263R3HoZLki1UH94lnhOn4RueJ3pJ6atYoGgQt8BhlMV8_rW1f1CmwXgHXCgDg59lgKeDErmehEZsi-18HupIEuYmKTA_he5mxlRgisOxjczaVyyZATNNlMcQo0KujKnHG-797I8crGke2sz0bBmJWF1rWPRRgCPZNU0lJz56WxF-a1Wbun7Ep_rcy2l5kZm0EoPXbFzJMc238KcqLy35atIirfZybppRMTMBOzmjuZ42VzzY9VjTHfTdt-CDEc7FXp0C1JIfcvgCgW2_yO8KkZqPEfGluh07AKOeWDitquWsvojrlFDAB2Ujkh3KAL3jSO2vZdxBZs6cK55uoLrVa2oEaWhbU2VQuPavoI86gy5JiSluIJbuzh8aWYf3dfDfXVDp25u6tGsiRh56FOO46Hrk",
    "e": "AQAB",
    "d": "gF6lHoPSxM-TLkIqIIFvtJ1fO1RhTcpR0U1o9TibEKZ9bR0adVQC7IcVvggDxhesIfFm3F-VQbnRmorch5AniZ_yQctAlldBZms6v_jYU0jRqDxm1nTptCPLrxkcV4USsPd9ME3nTl7WOF4KK2PqvhWy-u9ZslY7CpC13r65g2anthFzKavCGLjsW_G1CaPysSgAAY7oK91O5btTuDzhcdCQFOtkm-PJWltZzml32W274tBV6wLG4tN37eZf-nuAMqBz1QIzu9MweGsTMn5P3curcgf-qzsO5GxKWtq9VRrjYAebiM3f0WrEptoqjxB5dt58WPY-0jK4W7ycU7OvsNp3mf53qAWr7KAmQOsLJvFo2d8Zb8fy1HzXbM1UTn-gY5ZcfMOBNLwNIoyXQuRIPsY5k7TOKCJn1pNlKeFk2mN4C0PfhEtxH9ju3rbvRFc2AGixe_8FBVCV6sr_eNRtioezMFoDcnlkbaiDmQejnZB0XgZzDJXqOCcNcQE0Tts9o0kDT3WmkJ846rtnCyku2oBRbCc2i_9BRf7vWr8RxXk_JkvpIcc686mvU2UNJWRp2OI0J4yuAnQvljlsfcB1xMbRNd8FZWjoteHEz5szSxTjpDyN7z73Am_JSxWjI12sv6Wi0e3U4WGM1DlKJilGbr_6kBYuPOx-B5A5SlexjoE",
    "p": "09zMGJgkxpUKbW85489vDCngyqlkZVvUJTsPdeAoX-Ra2IFd-lLyGncF2pRjxaj5Jej7YKIjVxvzFAbdezdCQFhIloIet25061XfoMGnrqhtGzSHvqrPEYLG3gqzLcjSHcQwLCqXWfHGVkRseI92gv9tPN44Qc7EnnWzj7w_koECwtC87lQPSJueZ9HFM4dfY2j6j2j8zEWzhUZab5bBl7dqs-I6cVOPlO88QtDb94z2SWx51qLRi2uFD3UrzJb4ZD1cE_NHpfQZWs1gQbFTrdVjLEmfBmOY7yRqKOKJBnf_uXCD_RBIwgncOKV4JDKLtGHamXgoHH9a39NRaoEqkQ",
    "q": "yGw-uRQlzTibOffo7zIgXiz_HSCjBo25pGK6qO8cpZbb5Dfb0zOW4zp5FAudM56FrH29_j1u62VZ5H0E-AZhN7vBKXAlsm352-HmhiCuxTwoxzFKTQIuEcXXycQSOeBsWfiRggW2w9c8E3tf_txfGzgTkd5akU3R77NxNpKsgLqnE_aRL0i2o6AgNnvJViMoW9yp1_mOMC8KqNBDG2uUsF7GnxNe1hT1pLRPjqWShd1ia47fXE5Nlm1dAniRgo3RaKhkVLmeOkNslQnwxyOAWpOep4vUUf1UqMI8pfqzTBzbpd7NZRDOGWXd9biALj_nhtkKnO-vNl69pjd3T1U1qQ",
    "dp": "HYi6KvOKrOQ5_-dxeoCASoHMBHR4umiCum3xSc1l03hR8byXDT5i4a2V81KcVgGoOdCwulff9VTAHhqW5YZehfnIpLKe9ZNAWU4vTomwhniUPSalhb7p_tbsQifbspY8NEoVLRMC5lb9_yiqtmPJcZmJ8OJJlWLtpelijrb_Zbz2VZIjxFWTi9ulyXNEulo0wfbwdu170D4nOH0GPmgVtMCs70aqPwIXEfwHuojDIU9VRgcJNRKdg4IJmo4K_QpOtiqXm3BenJPatP3MXVwK_kCxAouAz7MyrqO06N4rm-s-iutUewK6IdKeEIeAqAsjzpGVl69YaCCY2nrq7p3zAQ",
    "dq": "C_BmzB-nINJ-bLWX6qfRxcpoaBPJolpO9Lvs4qNb0YFrF-076xjnpCGXlNocQzbuP5g9-ScvtFYVRMctxJicsfU9THqhxD9I4xBR6yuHPbiXtUX6Zxv6IpTmhd5oN4pm6fUktdohSQlJSt_OmCAIilaM0-OrAXzhRKYr2FRkckasLURC4c4zEww23wgAtmDhxpcehv8WuUgUGnpNhRSjht4edttwitA00drr4lN6pv7JHh8krxr7BDr_j2YfROet0c42K9Xi1xWtIjO1ZCd5PewNR23M-BVfNa5cbobAp4gQjZD4K00U-e5XiouzFw43fJDxUOf2SAbcxUoIkXFCAQ",
    "qi": "CGqFs94J_Cy1E11Ha0WTf5DUWnx4qnqJz1HVyuo9peleTm4fuDqgdwD0DWorR2w-AoITzSpli9QvhSaumm3u_WRwqu40tGt84Ja80zzacLOXEkbTRRTqY0MgA0_S1XFYyIQMkaYNhY7ynC-UsobhRFyhi5FusioJd3VaE1rkdOlOdH__x8e4Ah17YdD3x5MkjVXJvbEZzbslDu5JiwVzMSlUvDsGsNSG2l6wyMLIdHzS4yIzrlogU2rMKEmZw2_QZFntOBLZSJ7OQvRSzth7Zq30HTRvDd5YqV4OSVpQdk4-ZpRZf6hDWuVyMF_5HBsH5va18FTf3DgVMvn3SD0Hdg"
};

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