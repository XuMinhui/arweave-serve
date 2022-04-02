class ModuleConfig {
    /** 端口号 */
    readonly port = 3001;

    /** 接口前缀 */
    readonly api_prefix = "/api/v1/";

    /** 上传图片存放目录 */
    readonly upload_path = "public/upload/";

    /** 上传图片大小限制 */
    readonly upload_img_size = 5 * 1024 * 1024;

    /**
     * 前端上传图片时约定的字段
     * @example 
     * const formData = new FormData()
     * formData.append("img", file)
     * XHR.send(formData)
     */
    readonly upload_file_name = "file";    

    /** token 长度 */
    readonly token_size = 28;
}

/** 项目配置 */
const config = new ModuleConfig();

export default config;
