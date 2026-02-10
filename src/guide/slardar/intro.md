---
outline: deep
---

# 介绍

**Slardar** 
基于 Spring Securtiy 框架封装定义了 4A (Authentication、Authorization、Account、Audit) 相关的接口和逻辑流程，应用服务可以快速具有4A等能力。

## 版本说明

根据使用环境的不同，拆分为以下两个大的版本号，后续说明基于 `1.7.0` 版本来介绍 (2.0版本用法基本一致)

| 版本 | springboot版本 | jdk版本 |
|---------|---------|---------|
| 1.7.0   | springboot 2.5+   | java8   |
| 2.0.0   | springboot 3.5+   | java17   |

## 特性

- 基于 spring security 实现认证和权限控制
- 支持 SSO 单点登录
- 支持 MFA 多因素认证
- 支持登录加密、验证码等
- 支持 LDAP 等用户联合认证体系
- 支持集成方实现SPI进行自定义扩展
- oauth2 客户端集成，方便接入微博、gitee 等方式登录
- 丰富的定制扩展能力
- 支持 springboot 3 （版本 `2.0.0-SNAPSHOT`）

## 版本更新

最新版本: `1.7.0-SNAPSHOT`

### 1.7.0
- 更新升级内部依赖包的版本号
- 增加插件`slardar-ext-firewall` 用于控制接口访问
- 增加了`license`授权模块，可用于对应用进行授权
- 其他一些bug修复
  
### 1.6.0
- 移除了 `hutool` 的相关依赖，改为内部实现，可以避免和应用包内的 hutool 依赖冲突
- 重写了 `keystore` 模块，支持多种存储方式(memory/mapdb/mvstore/redis), 在轻量的单体服务中，可以不必依赖redis，采用内部存储即可
- 修复一些 bug

## 快速开始
### 1. 引入依赖

```xml
        <dependency>
            <groupId>io.github.sixcrabs</groupId>
            <artifactId>slardar-starter</artifactId>
            <version>1.7.0</version>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
            <version>2.7.18</version>
        </dependency>
```

### 实现接口
`Slardar` 定义好了认证和权限控制的流程和步骤，需要集成方提供一个实现类，用于获取账号信息，slardar 会在恰当的时机调用获取到账户信息

```java
@Component
public class SlardarProviderImpl implements AccountProvider, AuditLogIngest {

    public static final Map<String, Account> ACCOUNTS = new ConcurrentHashMap<>(2);

    private static final PasswordEncoder PASSWORD_ENCODER = new BCryptPasswordEncoder();

    static {
        ACCOUNTS.put("alex", new Account().setExpireAt(LocalDateTime.now().plusDays(2))
                .setPassword(PASSWORD_ENCODER.encode("123456"))
                .setName("alex")
                .setStatus(AccountStatus.accessible)
                .setPwdValidRemainDays(2)
                .setUserProfile(new UserProfile().setName("Alex Bone")));

        ACCOUNTS.put("macgrady", new Account().setStatus(AccountStatus.accessible)
                .setPassword(PASSWORD_ENCODER.encode("654321"))
                .setName("macgrady")
                .setUserProfile(new UserProfile().setName("T-MAC")));
    }

    /**
     * find by name (and realm)
     *
     * @param accountName
     * @param realm
     * @return
     */
    @Override
    public Account findByName(String accountName, String realm) throws SlardarException {
        return ACCOUNTS.get(accountName);
    }

    /**
     * find by openid (pk)
     *
     * @param openId
     * @return
     */
    @Override
    public Account findByOpenId(String openId) throws SlardarException {
        return null;
    }

    /**
     * ingest log
     *
     * @param auditLog
     */
    @Override
    public void ingest(AuditLog auditLog) {
        System.out.println(auditLog);
    }
}
```

> 这里示例代码在本地创建了示例账户，实际应用开发时 这部分应当从数据库中获取到用户信息


### 3. 修改配置

slardar 内置了登录、退出、获取详情等接口，为了方便定制化使用，提供了很多配置项来定制修改，我们可以修改默认的登录接口的url、请求方式、返回结构等：

```yaml
server:
    port: 9600 
slardar:
  login:
    login-result-fmt: simplified  # 默认登录接口返回简单的格式
    post-only: false              # 允许get方式调用/login （方便演示）
    captcha-enabled: false        # 关闭验证码
    encrypt:
      enabled: false              # 关闭登录密码加密
```

### 4. 启动测试

启动web应用后，进行登录： 

> `http://localhost:9600/login?username=alex&password=123456`

可以看到返回成功的登录结果：

```json
{
  "data": {
    "accountExpired": false,
    "accountLocked": false,
    "accountName": "alex",
    "token": "eyJhbGciOiJIUzUxMiIsInppcCI6IkRFRiJ9.eNpMyjsKgDAMANC7ZO6QNG0TvYzENoLgIH5AEO_u4uD6eDfs5wg92OLXkDGS6tQ0cU6VydjRtKkQoeSOIEDd3A5v0JMICnLkEmMK4Nf6mXaFS4DZjn96XgAAAP__.dn6W1zADaI2j3VkSd_m2RR-4y4fHz_uFMy12H7lyFPmz4RPoKPPWoE6bqimF_BCgwQ8S33B6jjJIPXJaLhhe4Q"
  },
  "message": "success",
  "code": 0
}
```

至此，一个简单的具备用户登录、认证、权限控制的security 服务就完成了

## 权限控制
上述验证了用户登录(`Authentication`)相关的功能，下面看下如何利用 Slardar 实现接口资源的权限控制，支持以下几种权限控制方式：

- 使用注解方式
- 使用配置文件（仅支持配置`ignore`地址，即忽略哪些url）
- 配置 spring bean 代码方式

### 注解方式

### @SlardarIgnore
配置该接口被忽略，即无需进行认证

```java{2}
    @GetMapping("/name")
    @SlardarIgnore
    public Resp getName() {
        return Resp.of(RandomUtil.randomString(18));
    }
```

### @SlardarAuthority
指定被注解的接口的访问权限

```java{2}
    @GetMapping("/admin/demo")
    @SlardarAuthority("hasRole('ADMIN')")
    public Resp onlyAdmin() {
        return Resp.of("admin_".concat(RandomUtil.randomString(12)));
    }
```
:::tip
定义可访问权限，支持:
- hasAnyRole('ADMIN')
- hasRole('xx')
- hasAuthority('xxx')
- hasAnyAuthority('xx','yy')
- permitAll()
- denyAll()
- ...
:::

### 配置方式
支持在配置文件中全局配置哪些url会被忽略:

```yaml{2}
slardar:
  ignores: /login,/open/**
```

### 自定义bean
自定义bean 可以定义需要被忽略的url以及对url进行细粒度的权限控制

:::code-group
```java [MyIgnoreRegistryImpl.java]
@Component
public class MyIgnoreRegistryImpl implements SlardarIgnoringCustomizer {
    @Override
    public void customize(WebSecurity.IgnoredRequestConfigurer configurer) {
        configurer.antMatchers("/api/greeting/**");
    }
}
```

```java [MyUrlRegistryCustomizerImpl.java]
@Component
public class MyUrlRegistryCustomizerImpl implements SlardarUrlRegistryCustomizer {

    /**
     * 配置自定义受限 url 信息
     *
     * @param registry
     */
    @Override
    public void customize(ExpressionUrlAuthorizationConfigurer<HttpSecurity>.ExpressionInterceptUrlRegistry registry) {
        // /admin 的url只能被 admin 角色访问
        registry.antMatchers("/api/admin/**").hasAnyRole("ADMIN", "SYS_ADMIN");
    }
}

```
:::

## 登录定制

内置了 `/login` 的登录接口以及 `/captcha` 的验证码接口，且提供了配置方式来满足不同场景的需求。

- 修改默认的登录url

```yaml
slardar:
  login:
    url: /auth/login
```

- 启用/关闭 登录验证码

```yaml {3}
slardar:
  login:
    captcha-enabled: false
```

- 设置登录最大尝试次数和失败锁定时间

```yaml
slardar:
  login:
    max-attempts-before-locked: 3 # 最大尝试次数
    failed-lock-duration: 2m   # 失败锁定时间
```

- 登录密码加密

```yaml
slardar:
  login:
      encrypt:
        enabled: true
        mode: sm4 # 采用国密4加密
```







