let captchaMode = false;
export  const appConfig = {
    tokenKey: 'Authorization',
	tenantMode: false, // 是否开启租户模式
	tenantId: "000000", // 管理组租户编号
	captchaMode, // 是否开启验证码模式
	grant_type: captchaMode ? "captcha" : "password",
	// 开发环境
    WEB_API: 'http://localhost:8080',
}
