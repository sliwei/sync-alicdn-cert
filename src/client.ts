// This file is auto-generated, don't edit it
// 依赖的模块可通过下载工程中的模块依赖文件或右上角的获取 SDK 依赖信息查看
import Cdn20180510, * as $Cdn20180510 from '@alicloud/cdn20180510'
import * as $OpenApi from '@alicloud/openapi-client'
import Console from '@alicloud/tea-console'
import Util, * as $Util from '@alicloud/tea-util'
import fs from 'fs'
import path from 'path'

export default class Client {
  /**
   * 使用AK&SK初始化账号Client
   * @param accessKeyId
   * @param accessKeySecret
   * @return Client
   * @throws Exception
   */
  static createClient(accessKeyId: string, accessKeySecret: string): Cdn20180510 {
    let config = new $OpenApi.Config({
      // 必填，您的 AccessKey ID
      accessKeyId: accessKeyId,
      // 必填，您的 AccessKey Secret
      accessKeySecret: accessKeySecret
    })
    // Endpoint 请参考 https://api.aliyun.com/product/Cdn
    config.endpoint = `cdn.aliyuncs.com`
    return new Cdn20180510(config)
  }

  static readFile(filepath): string {
    return fs.readFileSync(filepath, { encoding: 'utf8' })
  }

  static async main(args: string[]): Promise<void> {
    // 请确保代码运行环境设置了环境变量 ALIBABA_CLOUD_ACCESS_KEY_ID 和 ALIBABA_CLOUD_ACCESS_KEY_SECRET。
    // 工程代码泄露可能会导致 AccessKey 泄露，并威胁账号下所有资源的安全性。以下代码示例仅供参考，建议使用更安全的 STS 方式，更多鉴权访问方式请参见：https://help.aliyun.com/document_detail/378664.html
    let client = Client.createClient(process.env['ACCESS_KEY_ID'], process.env['ACCESS_KEY_SECRET'])
    const domainName = process.env['DOMAIN']
    const dirPath = path.join(process.env['LETS_ENCRYPT_CERTS_PATH'])
    const certId = parseInt(`${new Date().getTime() / 1000}`)
    const certName = `${domainName}-${new Date().getFullYear()}-${new Date().getMonth()}`
    const map = {
      domainName,
      certType: 'upload',
      certId,
      certName,
      SSLProtocol: 'on',
      // certRegion: "cn-hangzhou",
      SSLPub: Client.readFile(path.join(dirPath, 'cert.pem')),
      SSLPri: Client.readFile(path.join(dirPath, 'key.pem'))
    }
    let setCdnDomainSSLCertificateRequest = new $Cdn20180510.SetCdnDomainSSLCertificateRequest(map)
    let runtime = new $Util.RuntimeOptions({})
    let resp = await client.setCdnDomainSSLCertificateWithOptions(setCdnDomainSSLCertificateRequest, runtime)
    Console.log(Util.toJSONString(resp))
  }
}

Client.main(process.argv.slice(2))
